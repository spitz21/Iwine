import pandas as pd
import spacy
from gensim.utils import simple_preprocess
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from tqdm import tqdm

tqdm.pandas()

stop_words = stopwords.words('english')
stop_words.extend(['good', 'fresh', 'great', 'new', 'ready', 'firm', 'young', 'attractive', 'fine',
                   'clean', 'little', 'currant', 'fine', 'open', 'long', 'tight', 'concentrated',
                   'lively'])  # extended after alot of exploration with the descriptions. removed words that appeared often and had no value to the wine


wine_index = pd.read_fwf('data/wine_color.txt')
wine_index['Variety'] = wine_index['Variety'].str.lower()
wine_index = wine_index['Variety'].str.split(":", expand=True)
wine_index = wine_index.set_index(0).to_dict()[1]


def tokenization(docs):
    """
    tokenization breaks down a Corpus (a collection of documents) in to a list of docs (some text in the corpus)
    also removes special characters.
    each doc is then broken in to a list of the words and characters that make up the doc.
    :param docs:
    """
    for doc in tqdm(docs):
        yield simple_preprocess(str(doc), deacc=True)


def lemmatize(docs):
    """
    lemmatizing is the process of standardizing words in different inflected forms as an example:
    saved -> save
    saves -> save
    better -> good

    :param docs: tokenized doc
    :return: lemmatized doc (list of lists)
    """
    lemma = WordNetLemmatizer()
    return [[lemma.lemmatize(word) for word in doc] for doc in tqdm(docs)]


def allow_postages(docs, allowed_postags=['ADJ']):  # 'ADV', 'ADJ', 'PROPN','VERB'
    """
    allow_postages is a method designed to select specific words based off of specified parts of speech.
    Using the library spacy to extract parts of speech from a doc it will then parse through the doc
    selecting only the words that are in the allowed postage. Adjectives are the best choice because
    we are looking for descriptive words for wine.
    :param docs: a list of tokenized docs ex[['hello','world'],['I','am','tired']]
    :param allowed_postags: A list of parts of speech that the user wants to allow.
           see https://spacy.io/usage/linguistic-features#pos-tagging for more.
    :return: returns a the corpus (list of tokenized docs) with only the specified parts of speech left in this case
             adjectives
    """
    nlp = spacy.load("en_core_web_sm")
    texts_out = []
    for doc in tqdm(docs):
        doc = nlp(" ".join(doc))
        texts_out.append([token.lemma_ for token in doc if token.pos_ in allowed_postags])
    return texts_out


def remove_stopwords(docs):
    """
    removes stopwords designated in the nltk stopwords list
    :param docs: tokenized and lemmatized list of docs
    :return: cleaned corpus
    """
    return [[word for word in simple_preprocess(str(doc)) if word not in stop_words and len(word) >= 3] for doc in
            tqdm(docs)]


def encoding(x, code_index):
    """
    encoding is a helper method that iterates through each word in each doc
    then checks if the word exists in the code_index if it exists it will change
    the string at position j to 1

    :param x: is the doc being passed in
    :param code_index: a dictionary of words with their associated string position ex: {'sweet':3, 'soft':4,'crisp':5}
    :return: the code in the form of a comma seperated value string after encoding is done.
    """
    out_str = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    for word in x.split(" "):
        if word in code_index.keys():
            out_str[int(code_index[word])] = '1'
    return ",".join(out_str)


def non_null(A,B):
    """
    stupid little helper to condense the two region cols
    :param A: region_1
    :param B: region_2
    :return: region
    """

    if str(A) == 'nan' and str(B) == 'nan':
        return 'nan'
    if str(A) != 'nan' and str(B) == 'nan':
        return str(A)
    if str(A) == 'nan' and str(B) != 'nan':
        return str(B)
    return str(A) + ', '+str(B)


def process_and_encoding(wine_data):
    """
    creates encoded wine data cols: wid,price, designation, variety, region_1, region_2, province, country, winery,
    encoded
    TODO: maybe join region_1 and region_2 or just get rid of region_2
    :param wine_data:
    :return: true when done
    """
    data = wine_data.clean.values.tolist()

    # pre-processing
    print("Starting Tokenization")
    data_words = list(tokenization(data))
    print("Starting Lemmatization")
    data_words = lemmatize(data_words)

    # Filtering out unnessicary words
    print("Starting Remove Stopwards")
    data_words = remove_stopwords(data_words)
    print("Starting Allowed Postages")
    data_words = allow_postages(data_words)

    # flattens data out to build the list of all the words in the entire corpus
    # groups by unique description and gets the count
    # forms the code book with the top 20 descriptive words.

    data_flat = [i for j in data_words for i in j]
    wine_descriptive = pd.DataFrame(data_flat, columns=["descriptions"])
    descriptions = wine_descriptive.groupby('descriptions').size().sort_values(ascending=False)
    descriptions = pd.DataFrame(descriptions).reset_index().rename(columns={0: 'count'})
    code_book = descriptions[descriptions['count'] > 273][1:]

    # checking if the word is in the descriptive and then producing an encoding as a result
    code_book['index'] = [i for i in range(20)]
    code_index = code_book.set_index('descriptions').to_dict()['index']
    wine_data['cleaned'] = [" ".join(i) for i in data_words]
    wine_data['encoded'] = wine_data.apply(lambda row: encoding(row["cleaned"], code_index), axis=1)
    wine_data['region'] = wine_data.apply(lambda row: non_null(row['region_1'], row['region_2']), axis=1)
    wine_data = wine_data.drop(columns=['Unnamed: 0', 'clean', 'cleaned']).set_index('wid')

    #wine color column:
    wine_data['color'] = wine_data.apply(lambda row: wine_index[row['variety'].lower()], axis=1)
    wine_data = wine_data[['price', 'variety', 'region', 'province', 'country', 'winery', 'encoded', 'color']]
    wine_data.to_csv('data/encoded_wine_data.csv')

    return True



def create_reviews():
    """
    create reviews csv with cols: wid, points, title, description, tester_name, twitter
    :return: true when done
    """
    reviews = pd.read_csv('data/reviews_df.csv')
    reviews.drop(columns=['Unnamed: 0']).set_index('wid').to_csv('data/wine_reviews_wid.csv')
    return True


def main():
    data = pd.read_csv("data/wine_data_w_clean.csv")
    process_and_encoding(data)
    #create_reviews()


if __name__ == "__main__":
    main()
