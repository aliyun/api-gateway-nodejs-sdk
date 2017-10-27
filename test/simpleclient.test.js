'use strict';

const path = require('path');
const fs = require('fs');
const expect = require('expect.js');

const SimpleClient = require('../').SimpleClient;
const config = require('./config');

var readFile = function (filepath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, encoding, (err, content) => {
      if (err) {
        return reject(err);
      }
      resolve(content);
    });
  });
};

describe('SimpleClient', function () {
  var client = new SimpleClient(config.appcode);

  it('should ok get(url)', async function () {
    var url = 'https://dm-81.data.aliyun.com/rest/160601/ip/getIpInfo.json?ip=210.75.225.254';
    var result = await client.get(url);
    expect(result).to.be.eql({
      code: 0,
      data: {
        area: '华北',
        area_id: '100000',
        city: '北京市',
        city_id: '110100',
        country: '中国',
        country_id: 'CN',
        county: '',
        county_id: '',
        ip: '210.75.225.254',
        isp: '科技网',
        isp_id: '1000114',
        region: '北京市',
        region_id: '110000'
      }
    });
  });

  it('should ok with get(url, options)', async function () {
    var url = 'https://dm-81.data.aliyun.com/rest/160601/ip/getIpInfo.json';
    var result = await client.get(url, {
      data: {ip: '210.75.225.254'}
    });
    expect(result).to.be.eql({
      code: 0,
      data: {
        area: '华北',
        area_id: '100000',
        city: '北京市',
        city_id: '110100',
        country: '中国',
        country_id: 'CN',
        county: '',
        county_id: '',
        ip: '210.75.225.254',
        isp: '科技网',
        isp_id: '1000114',
        region: '北京市',
        region_id: '110000'
      }
    });
  });

  it('should ok with post(url)', async function () {
    var url = 'https://dm-72.data.aliyun.com/rest/160601/int_image/matching.json';
    var png = await readFile(path.join(__dirname + '/figures/test.png'), 'base64');
    var result = await client.post(url, {
      timeout: 5000, // 5s
      data: {
        'image': {
          'dataType': 10,
          'dataValue': png
        }
      }
    });

    expect(result).to.be.eql({
      result: {
        resultInfo: '成功',
        resultCode: 1,
        resultObject: [
          '#f9e4e0',
          '#f9f0e0',
          '#eaf9e0',
          '#e0f6f9',
          '#f0e0f9'
        ]
      }
    });
  });
});
