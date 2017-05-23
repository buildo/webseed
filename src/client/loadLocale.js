export default function(config, loadMessagesFor) {
  return function loadLocale(locale) {
    return new Promise(resolve => {
      return loadMessagesFor(locale).then(resolve.bind(this));
    });
  };
}
