var sightengine = require('./sightengine')('1234','test');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('test feedback', function() {
  it('should return success', function(done) {
    sightengine.feedback('nudity', 'safe', 'https://sightengine.com/assets/img/examples/example5.jpg').then((result) => {
      done(assert.equal('success', result.status))
    })
  });

  it('should return error', function(done) {
    sightengine.feedback('nudity', 'safe', 'https://sightengine.com/assets/img/examples/example99999.jpg').then((result) => {
      done(assert.equal('failure', result.status))
    })
  });
});

describe('test image moderation', function() {
  it('should return success', function(done) {
    sightengine.check(['nudity', 'type', 'properties','wad','faces', 'celebrities']).set_url('https://sightengine.com/assets/img/examples/example5.jpg').then(function(result) {
      done(assert.equal('success', result.status))
    })
  });

  it('should return success', function(done) {
    sightengine.check(['nudity']).set_url('https://sightengine.com/assets/img/examples/example5.jpg').then(function(result) {
      done(assert.equal('success', result.status))
    })
  });

  it('should return success', function(done) {
    sightengine.check(['nudity', 'type', 'properties','wad','faces', 'celebrities']).set_file(path.resolve(__dirname, 'assets', 'image.jpg')).then(function(result) {
      done(assert.equal('success', result.status))
    })
  });

  it('should return success', function(done) {
    sightengine.check(['celebrities']).set_file(path.resolve(__dirname, 'assets', 'image.jpg')).then(function(result) {
      done(assert.equal('success', result.status))
    })
  });

  it('should return success', function(done) {
    var binaryImage = fs.createReadStream(path.resolve(__dirname, 'assets', 'image.jpg'));

    sightengine.check(['nudity']).set_bytes(binaryImage).then(function(result) {
      done(assert.equal('success', result.status))
    })
  });

  it('should return success', function(done) {
    var binaryImage = fs.createReadStream(path.resolve(__dirname, 'assets', 'image.jpg'));

    sightengine.check(['nudity', 'type', 'properties','wad','faces', 'celebrities']).set_bytes(binaryImage).then(function(result) {
      done(assert.equal('success', result.status))
    })
  });

  it('should return error', function(done) {
    sightengine.check(['nudity','wad','properties','type','faces','celebrities']).set_url('https://sightengine.com/assets/img/examples/example99999.jpg').then(function(result) {
      done(assert.equal('failure', result.status))
    })
  });
});


describe('video moderation', function() {
  it('should return success', function(done) {
    sightengine.check(['nudity','wad','properties','type','face','celebrities']).video('https://sightengine.com/assets/stream/examples/funfair.mp4', 'http://requestb.in/1d097l71').then(function(result) {
      this.timeout(60000);
      done(assert.equal('success', result.status))
    })
  });
});



