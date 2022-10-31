export default function debounce(func, ms, now) {
  let onLast;

  function wrapper(...args) {
    const context = this;
    const onFirst = now && !onLast;

    clearTimeout(onLast);

    onLast = setTimeout(() => {
      onLast = null;
      if (!now) func.apply(context, args);
    }, ms);

    if (onFirst) func.apply(context, args);
  }

  return wrapper;
}
