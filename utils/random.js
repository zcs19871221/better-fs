/**
 * 生成指定范围随机数,ex: random('[',')', 4, 7) 生成包含4不包含7的随机数
 * @date 2019-11-05
 * @param {String} startTag - 前置`'['`(包含)或`'('`(不包含)
 * @param {String} endTag - 后置`']'`(包含)或`')'`(不包含)
 * @param {Number} start - 开始整数
 * @param {Number} end - 结束整数
 * @returns {Number}
 */
module.exports = function random(startTag, endTag, start, end) {
  if (
    !['[', '('].includes(startTag) ||
    ![']', ')'].includes(endTag) ||
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    end < start
  ) {
    throw new Error('格式错误,输入 [4,7) 这种');
  }
  if (startTag === '(') {
    start += 1;
  }
  if (endTag === ']') {
    end += 1;
  }
  return Math.floor((end - start) * Math.random() + start);
};
