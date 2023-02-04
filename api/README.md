## **REST API DOCUMENTATION**

### **INSTALLATION**
This API is designed to be run on an xampp server using localhost.
This installation guide assumes that you have a git clone of the iWine repository.
Here are the steps to getting the api up and running:
1. Install XAMPP and ensure that you install both apache and mysql
2. Open XAMPP and start the Apache and MySQL servers
3. On the mysql part of the control pannel click admin,  navigate to databases and create a new database named iwine, you can then close this
4. navigate to the directory you installed XAMPP and find the htdocs folder, copy the entire api folder from the repo to this folder
5. Now you can click on the shell button in the xampp control panel from there you can:
`cd htdocs/api/src` and then run `php CreateDatabase.php`
6. you should have successfully set up the database and the api is ready to recieve requests as long as apache and mysql are running.


### **SET UP PYTHON**
Setting up python in xampp is pretty simple here are the steps: 
1. make sure you have an updated version of python 
   `python3 --version`
2. In the XAMPP Control Panel navigate to the Apache Web Server > Configure > Open Conf File
3. At the bottom of the file httpd.conf write: 
```
AddHandler cgi-script .py
<IfModule mpm_winnt_module>
ScriptInterpreterSource Registry-Strict
</IfModule>
```

#### **Load Data** 
Inorder to load the data in to the iwine db simply run PopulateDB.py

for some reason I have not been able to run PopulateDB.py using xampp but it works if it is ran using an IDE. 


### **ENDPOINTS**
#### **Users**
**ENDPOINT:** https://localhost:8080/api/user/resource  
**METHODS:** GET, PATCH, DELETE  
**GET:**  
    ALLOWED RESOURCES: ID  
    RETURN: The ROW as JSON {id, username, email, password, google_uuid} specified by the RESOURCE  
**PATCH:**  
    ALLOWED RESOURCES: ID  
    PASSED: JSON {username, email, password, google_uuid}  
    RETURN: ID of row altered  
**DELETE:**  
    ALLOWED_RESOUCES: ID  
    RETURN: ID of row deleted  
  
**ENDPOINT:** https://localhost:8080/api/user  
**METHODS:** GET, POST  
**GET:**  
    RETURN: Array of ROWS as JSON {id, username, email, password, google_uuid}  
**POST:**  
    PASSED: JSON {id, username, email, password, google_uuid}  
    RETURNED: ID of inserted Entry  
  
#### **Wine**
**ENDPOINT:** https://localhost:8080/api/wine/resource  
**METHODS:** GET, PATCH, DELETE  
**GET:**  
    ALLOWED RESOURCES: ID  
    RETURN: The ROW as JSON {id, price, name, region, country, province, variety, winery, color, attributes} specified by the RESOURCE  
**PATCH:**  
    ALLOWED RESOURCES: ID  
    PASSED: JSON {price, name, region, country, province, variety, winery, color, attributes}  
    RETURN: ID of row altered  
**DELETE:**  
    ALLOWED_RESOUCES: ID  
    RETURN: ID of row deleted  
  
**ENDPOINT:** https://localhost:8080/api/wine/filtered  
**METHODS:** POST  
**POST:**  
    PASSED: JSON {price, name, region, country, province, variety, winery, color, attributes}  
    RETURN: Array of ROWS as JSON {id, price, name, region, country, province, variety, winery, color, attributes} WHERE values match all filters  
  
**ENDPOINT:** https://localhost:8080/api/wine  
**METHODS:** GET, POST  
**GET:**  
    RETURN: Array of ROWS as JSON {id, price, name, region, country, province, variety, winery, color, attributes} 
**POST:**  
    PASSED: JSON {price, name, region, country, province, variety, winery, color, attributes} 
    RETURNED: ID of inserted Entry 

#### **Reviews**  
**ENDPOINT:** https://localhost:8080/api/review/resource
**METHODS:** GET, PATCH, DELETE  
**GET:**  
    ALLOWED RESOURCES: ID  
    RETURN: The ROW as JSON {id, rating, reviewer, title, wine_id} specified by the resource  
**PATCH:**  
    ALLOWED RESOURCES: ID  
    PASSED: JSON {rating, reviewer, title, wine_id}  
    RETURN: The id of the modified resource  
**DELETE:**  
    ALLOWED RESOURCES: ID  
    RETURN: The ID of the removed resource  
  
**ENDPOINT:** https://localhost:8080/api/review  
**METHODS:** GET, POST  
**GET:**  
    RETURN: An array of ROWS as JSON {id, rating, reviewer, title, wine_id}  
**POST:**  
    PASSED: JSON {rating, reviwer, title, wine_id}
    RETURN: The ID of the new row



