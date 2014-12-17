Salesforce Analytics Cloud SAQL Tester
======================================

This bookmarklet allows you to run and debug Salesforce Analytics Cloud SAQL statements quickly and easily.

Current Version
---------------

v0.2 (2014-12-17)

Installation
------------

To install this bookmarklet, copy the source of file [SAQL_Tester.js](https://github.com/Cervello/Shared/blob/master/SAQL_Tester/SAQL_Tester.js) and paste the contents into the location field of a bookmark.

Usage
-----

To use this bookmarklet, log in to Salesforce Analytics Cloud. From any Analytics page, click the bookmarklet in your Bookmarks. Type or paste a SAQL query into the Input field and click Send. The query response will be displayed in the Output field.

Input Help
----------

Example input:
`q = load \"0Fbf00000004E4eCAE/0Fcf00000004DGPCA2\"; q = filter q by 'Account_Name' in [\"Nobeltec\", \"Norsteel\"]; q = group q by ('Fiscal_Qtr','Fiscal_Year'); q = foreach q generate 'Fiscal_Qtr' as 'Fiscal_Qtr','Fiscal_Year' as 'Fiscal_Year',sum('Booking') as 'sum_Booking',count() as 'count'; q = limit q 2000;`

Tips:
- The above example will not work for your org. It is provided for syntax help only.
- It is recommended that you use browser developer tools (F12) to get a query to start with. Look in the response to the "remote" POST.
- You may escape double-quotes, but it is not necessary here. However, you must escape double-quotes when you use this in the "pigql" tag of your dashboard JSON.
- You may use newlines here. However, you can not use newlines in the "pigql" tag of your dashboard JSON.
- Dataset names will not work here. You must use the fully-qualified "id/version" identifier.

About
-----

This bookmarklet was created by Marc Hassan (mhassan AT mycervello.com) of Cervello Inc, December 2014. Feel free to share and/or fork!
