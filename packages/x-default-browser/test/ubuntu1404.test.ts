import reqwire from "rewire";

const detect = reqwire('../src/detect-linux.ts')

var execResponse = {
  code: 0,
  stdout: '',
  stderr: '',
};

var execStub = function (cmd, cb) {
  cb(execResponse.code, execResponse.stdout, execResponse.stderr);
};

jest.mock("child_process", () => ({
  exec: execStub
}))

describe('Ubuntu 14.04 tests', function () {
  beforeEach(function () {
    execResponse.code = 0;
    execResponse.stdout = '';
    execResponse.stderr = '';
  });

  it('detects chrome', function (done) {
    execResponse.stdout = 'google-chrome.desktop';

    detect(function (err, res) {
      expect(res.isChrome).toEqual(true);
      expect(res.isChromium).toEqual(false);
      expect(res.isWebkit).toEqual(true);
      expect(res.commonName).toEqual('chrome');
      expect(res.identity).toEqual(execResponse.stdout);
      done(err);
    });
  });

  it('detects chromium', function (done) {
    execResponse.stdout = 'chromium-browser.desktop';

    detect(function (err, res) {
      expect(res.isChrome).toEqual(false);
      expect(res.isChromium).toEqual(true);
      expect(res.isWebkit).toEqual(true);
      expect(res.commonName).toEqual('chromium');
      expect(res.identity).toEqual(execResponse.stdout);
      done(err);
    });
  });

  it('detects opera', function (done) {
    execResponse.stdout = 'opera.desktop';

    detect(function (err, res) {
      expect(res.isChrome).toEqual(false);
      expect(res.isChromium).toEqual(false);
      expect(res.isOpera).toEqual(true);
      expect(res.isWebkit).toEqual(true);
      expect(res.commonName).toEqual('opera');
      expect(res.identity).toEqual(execResponse.stdout);
      done(err);
    });
  });

  it('detects firefox', function (done) {
    execResponse.stdout = 'firefox.desktop';

    detect(function (err, res) {
      expect(res.isFirefox).toEqual(true);
      expect(res.isWebkit).toEqual(false);
      expect(res.commonName).toEqual('firefox');
      expect(res.identity).toEqual(execResponse.stdout);
      done(err);
    });
  });
});
