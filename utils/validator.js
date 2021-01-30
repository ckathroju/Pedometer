const emailPattern = new RegExp(
  '([^@\\s."\\(\\)\\[\\]\\{\\}\\/,:;]+\\.)*[^@\\s\\."\\(\\)\\[\\]\\{\\}\\/,:;]+@[^@\\s\\."\'\\(\\)\\[\\]\\{\\}\\/,:;]+(\\.[^@\\s\\."\'\\(\\)\\[\\]\\{\\}\\/,:;]+)+',
  "i"
);

export const validateEmail = (val) => {
  return emailPattern.test(val);
};

export const validatePassword = (val) => {
  return val.length >= 8;
};
