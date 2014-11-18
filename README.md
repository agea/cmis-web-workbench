Cmis Web Workbench
==================

A tool for developers who work with CMIS browser bindings

The scope of the project is to build a tool similar to the [CMIS Workbench](http://chemistry.apache.org/java/developing/tools/dev-tools-workbench.html) by Apache Chemistry

Usage (Alfresco)
-------------------------

Download [dist/workbench.html](https://github.com/agea/cmis-web-workbench/raw/master/dist/workbench.html) in ```tomcat/webapps/ROOT``` and  open [http://localhost:8080/workbench.html]()

(It will work on any iplementation as long as you are able to reach the CMIS endpont via ajax requests)

Remote Usage
-------------------------
####You need to install node to connect to a remote server

    $ git clone https://github.com/agea/cmis-web-workbench
    $ cd cmis-web-workbench
    $ npm install
    $ grunt server --host SERVER --port PORT --path BROWSER_BINDING_PATH

Then you can connect to http://localhost:9000

License
-------
MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
