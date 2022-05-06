import reqwire from 'rewire';

const detect = reqwire('../src/detect-windows.ts');

const execResponse = {
  code: 0,
  stdout: '',
  stderr: '',
};

const execStub = function (cmd, cb) {
  cb(execResponse.code, execResponse.stdout, execResponse.stderr);
};

jest.mock('child_process', () => ({
  exec: execStub,
}));

describe('Windows 7 tests', function () {
  beforeEach(function () {
    execResponse.code = 0;
    execResponse.stdout = '';
    execResponse.stderr = '';
  });

  it('detects chrome', function (done) {
    execResponse.stdout = '    (Default)    REG_SZ    Google Chrome';

    detect(function (err, res) {
      expect(res.isChrome).toEqual(true);
      expect(res.isChromium).toEqual(false);
      expect(res.isWebkit).toEqual(true);
      expect(res.isBlink).toEqual(true);
      expect(res.commonName).toEqual('chrome');
      expect(res.identity).toEqual('google chrome');
      done(err);
    });
  });

  it('detects chromium', function (done) {
    execResponse.stdout =
      '    (Default)    REG_SZ    Chromium.TFMVRFVME5QY6U4BBVKW7UPHQY';

    detect(function (err, res) {
      expect(res.isChrome).toEqual(false);
      expect(res.isChromium).toEqual(true);
      expect(res.isWebkit).toEqual(true);
      expect(res.isBlink).toEqual(true);
      expect(res.commonName).toEqual('chromium');
      expect(res.identity).toEqual('chromium.tfmvrfvme5qy6u4bbvkw7uphqy');
      done(err);
    });
  });

  it('detects opera', function (done) {
    execResponse.stdout = '    (Default)    REG_SZ    OperaStable';

    detect(function (err, res) {
      expect(res.isOpera).toEqual(true);
      expect(res.isChrome).toEqual(false);
      expect(res.isChromium).toEqual(false);
      expect(res.isWebkit).toEqual(true);
      expect(res.isBlink).toEqual(true);
      expect(res.commonName).toEqual('opera');
      expect(res.identity).toEqual('operastable');
      done(err);
    });
  });

  it('detects safari', function (done) {
    execResponse.stdout = '    (Default)    REG_SZ    Safari.exe';

    detect(function (err, res) {
      expect(res.isSafari).toEqual(true);
      expect(res.isChrome).toEqual(false);
      expect(res.isChromium).toEqual(false);
      expect(res.isWebkit).toEqual(true);
      expect(res.isBlink).toEqual(false);
      expect(res.commonName).toEqual('safari');
      expect(res.identity).toEqual('safari.exe');
      done(err);
    });
  });

  it('detects firefox', function (done) {
    execResponse.stdout = '    (Default)    REG_SZ    FIREFOX.EXE';

    detect(function (err, res) {
      expect(res.isFirefox).toEqual(true);
      expect(res.isWebkit).toEqual(false);
      expect(res.commonName).toEqual('firefox');
      expect(res.identity).toEqual('firefox.exe');
      done(err);
    });
  });

  it('detects ie', function (done) {
    execResponse.stdout = '    (Default)    REG_SZ    IEXPLORE.EXE';

    detect(function (err, res) {
      expect(res.isIE).toEqual(true);
      expect(res.isWebkit).toEqual(false);
      expect(res.commonName).toEqual('ie');
      expect(res.identity).toEqual('iexplore.exe');
      done(err);
    });
  });
});
