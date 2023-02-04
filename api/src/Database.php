<?php

class Database
{
    private $host;
    private $name;
    private $user;
    private $password;
    /**
     * @param host the hostname of the database
     * @param name the name of the database
     * @param user the username used for the database
     * @param password the password for the user that has access to the database
     */
    public function __construct(string $host,
                                string $name,
                                string $user,
                                string $password)
    {
        $this->host = $host;
        $this->name = $name;
        $this->user = $user;
        $this->password = $password;
    }
    /**
     * Gets a databse connection based on the paramers of the original database
     * @return PDO which is a database object which you can use to send queries to
     */
    public function getConnection(): PDO
    {
        $dsn = "mysql:host={$this->host};dbname={$this->name};";
        return new PDO($dsn, $this->user, $this->password, [
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_STRINGIFY_FETCHES => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
    }
}