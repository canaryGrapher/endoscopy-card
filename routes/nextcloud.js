const wfs = require("webdav-fs")(
  "https://demo2.nextcloud.com/remote.php/dav/files/iXYHAKmjwEH6YweL/",
  {
    username: "iXYHAKmjwEH6YweL",
    password: "tXk8C-EMDwR-wXryq-tPntY-3wZKa",
  }
);

module.exports = wfs