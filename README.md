# Zimbra SSH DKIM


#Create, update and delete zimbra dkim over SSH with Nodejs

---------------------------------------------------------------------------------------

#Install 

    npm install

---------------------------------------------------------------------------------------

#Proje Start
    npm start  
------------------------------------------------------------------------

#Example : Creating a DKIM

    Dkim_create(ssh,'domain.com')

####Example Output :
    
    {
        status: 'success',
        msg: 'domain.com alan adı için DKIM oluşturuldu.',
        txt: 'A6361DE0-B131-22EC-AAF5-DAF356FE91DE._domainkey',
        dkim: 'v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQDVGQCKLUYUIIIBCgKCAQEAwBlHDvtHNjgDVXSX8n8nunFBFOdDZ9SpLhWzLTasoWp2B7KGWKcHFBXshCWDYb+PPOkqrVyTePjno0O47CN5vB0SozcwS+Vwn0d9WQS3eyLQp3imso5MDL0xGroDDueXlkBAytcbKbbXQ447f7bqCYSd/8BQPmClluBqD7GB1HSswGTOh+/n0QYES/TDClvEriKvTnyRwGpBzLwtSKU3jexWS0Yd//0loFVfsZmRkPLLOBEAEZjXrhRsEG/HpH7hfGMSQQG7H5TIZIa+xbmXOu5Bi1E7bOSO0vpWi0E003wAB20YZlGTFxXfRpQNiUl1e48i4dhD2yY6JEj14r+ROwIDAQAB'
    }

-------------------------------------------------------------------------

#Example : DKIM Renewal

    Dkim_update(ssh,'domain.com')

#Example Output :

    {
        status: 'success',
        msg: 'domain.com alan adı için kaydı güncellendi.',
        txt: 'A6361DE0-B131-22EC-AAF5-DAF356FE91DE._domainkey',
        dkim: 'v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQDVGQCKLUYUIIIBCgKCAQEAwBlHDvtHNjgDVXSX8n8nunFBFOdDZ9SpLhWzLTasoWp2B7KGWKcHFBXshCWDYb+PPOkqrVyTePjno0O47CN5vB0SozcwS+Vwn0d9WQS3eyLQp3imso5MDL0xGroDDueXlkBAytcbKbbXQ447f7bqCYSd/8BQPmClluBqD7GB1HSswGTOh+/n0QYES/TDClvEriKvTnyRwGpBzLwtSKU3jexWS0Yd//0loFVfsZmRkPLLOBEAEZjXrhRsEG/HpH7hfGMSQQG7H5TIZIa+xbmXOu5Bi1E7bOSO0vpWi0E003wAB20YZlGTFxXfRpQNiUl1e48i4dhD2yY6JEj14r+ROwIDAQAB'
    }

-------------------------------------------------------------------------

#Example : DKIM Delete

    Dkim_delete(ssh,'domain.com')


-----------------------------------------------------------------------
website : https://epixsoft.net