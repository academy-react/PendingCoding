function getPersianNumbers(en,date) {
  if(!date) en = numberWithCommas(en);
  return ("" + en).replace(/[0-9]/g, function (t) {
    return "٠١٢٣٤٥٦٧٨٩".slice(+t, +t + 1);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { getPersianNumbers };
