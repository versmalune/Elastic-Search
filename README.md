## Dataset-search

dataset metadata search using Elasticsearch

Read the [wiki](https://github.com/madhums/node-express-mongoose/wiki) to understand how the application is structured.

## System Environments
    
    * node.js version: 12.16.1
    * express version: 4.16.1 
    * Database: MongoDB 3.2
    * Search Engine: Elasticsearch 7.10.2

## Usage

    git clone https://gitlab.com/billiamchoi4u/dataset-search.git
    cd dataset-search
    npm install
    cp .env.example .env
    윈도우의 경우 copy .env.example .env
    npm start

## Elasticsearch Settings

  * FROM MAC:
    
    * If you download elasticsearch with Homebrew, elasticsearch.yml file is in below location 
      - /usr/local/etc/elasticsearch/  

  * FROM WINDOWS:
      
      * elasticsearch.yml file is in below location 
        - <installation_dir>/config/ 

     
  * Add following line in elasticsearch.yml

      ```
      http.cors.enabled: true
      http.cors.allow-origin: "*"
      ```


