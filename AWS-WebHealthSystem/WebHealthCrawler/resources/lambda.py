import datetime
import urllib3
import json

def getUrls():
    http = urllib3.PoolManager()
    response = http.request("GET", "https://f2trc7ftvk.execute-api.us-east-2.amazonaws.com/prod/api/v1/url")
    data = json.loads(response.data)["data"]
    URLS = []
    for url in data:
        URLS.append(url["url"])
    return URLS


def updateUrlHealth(url_health:list):
    http = urllib3.PoolManager()
    for url in url_health:
        encoded_data = json.dumps(url_health[url]).encode('utf-8')
        print(encoded_data)
        r = http.request(
            'POST',
            'https://f2trc7ftvk.execute-api.us-east-2.amazonaws.com/prod/api/v1/health/',
            body=encoded_data,headers={'Content-Type': 'application/json'}
        )
        if r.status == 201:
            print("Inserted")
        else:
            print(r.status)


def lambda_handler(event, context):
    urls = getUrls()
    result = dict()  # to store latency, availability of every website

    for url_ in urls:
        avail_value = calc_availability(url_)  # Availability of resource (website)
        latency_value = calc_latency(url_)  # Latency of resource (website)
        result.update({url_:{"url":url_, "Availability": avail_value, "Latency": latency_value}})  # webhealth result stored
    updateUrlHealth(result)
    return result


def calc_availability(url):
    http = urllib3.PoolManager()  # pool manager instance for sending requests
    response = http.request('GET', url)  # sending GET request, getting response as HTTPResponse object
    if response.status == 200:
        return 1
    else:
        return 0


def calc_latency(url):
    http = urllib3.PoolManager()  # pool manager instance for sending requests
    start = datetime.datetime.now()
    response = http.request('GET', url)  # sending GET request, getting response as HTTPResponse object
    end = datetime.datetime.now()
    delta = end - start  # take time diff from start to end
    LatencySec = round(delta.microseconds * 0.000001, 6)

    return LatencySec

