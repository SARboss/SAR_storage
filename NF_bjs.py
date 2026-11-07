from flask import Flask, request, jsonify
import requests
import urllib.parse

app = Flask(__name__)

IOS_API = "https://ios.prod.ftl.netflix.com/iosui/user/15.48"
IOS_HEADERS = {
    "User-Agent": "Argo/15.48.1 (iPhone; iOS 15.8.5; Scale/2.00)",
    "x-netflix.request.attempt": "1",
    "x-netflix.request.client.user.guid": "A4CS633D7VCBPE2GPK2HL4EKOE",
    "x-netflix.context.profile-guid": "A4CS633D7VCBPE2GPK2HL4EKOE",
    "x-netflix.request.routing": '{"path":"/nq/mobile/nqios/~15.48.0/user","control_tag":"iosui_argo"}',
    "x-netflix.context.app-version": "15.48.1",
    "x-netflix.argo.translated": "true",
    "x-netflix.context.form-factor": "phone",
    "x-netflix.context.sdk-version": "2012.4",
    "x-netflix.client.appversion": "15.48.1",
    "x-netflix.context.max-device-width": "375",
    "x-netflix.context.ab-tests": "",
    "x-netflix.tracing.cl.useractionid": "4DC655F2-9C3C-4343-8229-CA1B003C3053",
    "x-netflix.client.type": "argo",
    "x-netflix.client.ftl.esn": "NFAPPL-02-IPHONE8=1-PXA-02026U9VV5O8AUKEAEO8PUJETCGDD4PQRI9DEB3MDLEMD0EACM4CS78LMD334MN3MQ3NMJ8SU9O9MVGS6BJCURM1PH1MUTGDPF4S4200",
    "x-netflix.context.locales": "en-US",
    "x-netflix.context.top-level-uuid": "90AFE39F-ADF1-4D8A-B33E-528730990FE3",
    "x-netflix.client.iosversion": "15.8.5",
    "accept-language": "en-US;q=1",
    "x-netflix.argo.abtests": "",
    "x-netflix.context.os-version": "15.8.5",
    "x-netflix.request.client.context": '{"appState":"foreground"}',
    "x-netflix.context.ui-flavor": "argo",
    "x-netflix.argo.nfnsm": "9",
    "x-netflix.context.pixel-density": "2.0",
    "x-netflix.request.toplevel.uuid": "90AFE39F-ADF1-4D8A-B33E-528730990FE3",
    "x-netflix.request.client.timezoneid": "Asia/Dhaka",
}

@app.route('/check', methods=['POST'])
def check():
    data = request.json
    if not data or 'cookie' not in data:
        return jsonify({"status": "error", "msg": "No cookie provided"}), 400
        
    nfid = data['cookie'].strip()
    
    # Decode URL encoding just in case
    nfid = urllib.parse.unquote(nfid)

    headers = IOS_HEADERS.copy()
    headers["Cookie"] = f"NetflixId={nfid}"

    try:
        r = requests.get(IOS_API, headers=headers, timeout=15, verify=False)
        if r.status_code == 200:
            token_data = r.json().get('value', {}).get('account', {}).get('token', {}).get('default', {})
            token = token_data.get('token')
            if token:
                return jsonify({"status": "working", "token": token})
    except Exception as e:
        pass

    return jsonify({"status": "dead"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
