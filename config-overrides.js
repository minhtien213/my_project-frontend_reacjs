//file cấu hình đè webpack
const { override, useBabelRc} = require("customize-cra");

module.exports = override(
    useBabelRc() //nập thêm file bablerc vào webpack config
);