var SSH = require('simple-ssh');

var ssh = new SSH({
    host    : 'ip_address/hostname',
    user    : 'root',
    port    : 22,
    pass    : 'ssh_password',
    timeout : 1000,
    baseDir : '/tmp'
});
ssh.on('error', onSSHError)

Dkim_create(ssh,'domain.com')

function Dkim_create(ssh,domain){
    ssh.exec(`su zimbra -c " /opt/zimbra/libexec/zmdkimkeyutil -a -d ${domain}"`, {
        out: async function(stdout) {
            if(stdout.indexOf("Error") == 0){
                var data    = {
                    'status': 'error',
                    'msg'   : `${domain} alan adı için DKIM zaten etkin.`,
                    'txt'   : '',
                    'dkim'  : ''
                }
            }else{
                if(stdout.indexOf('not found')  == 0){
                    var data    = {
                        'status': 'error',
                        'msg'   : `${domain} alan adi geçersiz. Alan adınızı kontrol ediniz `,
                        'txt'   : '',
                        'dkim'  : ''
                    }
                }else{
                    stdout = await stdout.replaceAll('"','');
                    var ext     = await stdout.split('v=DKIM1; k=rsa; ');
                    var e       = await ext[1].split(')  ; -----');
                    var dkim    = await "v=DKIM1; k=rsa;" + e[0]
                    dkim    = await dkim.replace(/\s+/g, '');
                    var txt     = await e[1].replaceAll(' DKIM key ','');
                    txt     = await txt.replaceAll(` for ${domain}`,'._domainkey');
                    txt     = await txt.replace(/\s+/g, '');

                    var data    = {
                        'status': 'success',
                        'msg'   : `${domain} alan adı için DKIM oluşturuldu.`,
                        'txt'   : txt,
                        'dkim'  : dkim
                    }
                }

            }

            await console.log(data);
            await ssh.end();

        }
    }).start();
}
function Dkim_update(ssh,domain){
    ssh.exec(`su zimbra -c " /opt/zimbra/libexec/zmdkimkeyutil -u -d ${domain}"`, {
        out: async function(stdout) {
            if(stdout.indexOf("Error") == 0){
                var data    = {
                    'status': 'error',
                    'msg'   : `${domain} alan adı için DKIM etkin değil.`,
                    'txt'   : '',
                    'dkim'  : ''
                }
            }else{
                console.log(stdout.indexOf('not found'));
                if(stdout.indexOf('not found') != -1){
                    var data    = {
                        'status': 'error',
                        'msg'   : `${domain} alan adi geçersiz. Alan adınızı kontrol ediniz `,
                        'txt'   : '',
                        'dkim'  : ''
                    }
                }else {
                    stdout = await stdout.replaceAll('"', '');
                    var ext = await stdout.split('v=DKIM1; k=rsa; ');
                    var e = await ext[1].split(')  ; -----');
                    var dkim = await "v=DKIM1; k=rsa;" + e[0]
                    dkim = await dkim.replace(/\s+/g, '');
                    var txt = await e[1].replaceAll(' DKIM key ', '');
                    txt = await txt.replaceAll(` for ${domain}`, '._domainkey');
                    txt = await txt.replace(/\s+/g, '');

                    var data = {
                        'status': 'success',
                        'msg': `${domain} alan adı için DKIM kaydı güncellendi.`,
                        'txt': txt,
                        'dkim': dkim
                    }
                }
            }

            await console.log(data);
            await ssh.end();

        }
    }).start();
}
function Dkim_delete(ssh,domain){
    ssh.exec(`su zimbra -c " /opt/zimbra/libexec/zmdkimkeyutil -r -d ${domain}"`, {
        out: async function(stdout) {
            console.log(stdout);

            return false;
            stdout = await stdout.replaceAll('"','');
            var ext     = await stdout.split('v=DKIM1; k=rsa; ');
            var e       = await ext[1].split(')  ; -----');
            var dkim    = await "v=DKIM1; k=rsa;" + e[0]
            dkim    = await dkim.replace(/\s+/g, '');
            var txt     = await e[1].replaceAll(' DKIM key ','');
            txt     = await txt.replaceAll(` for ${domain}`,'._domainkey');
            txt     = await txt.replace(/\s+/g, '');

            var data    = {
                'txt'   : txt,
                'dkim'  : dkim
            }

            await console.log(data);
            await ssh.end();
        }
    }).start();
}

function onSSHError(data) {
    console.log('Bağlantı sağlanamadi. Lütfen bilgileriniz kontrol ediniz.');
}


