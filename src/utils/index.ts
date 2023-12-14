export const focusNextInput = (source: HTMLElement) => {
  const sibling = source.nextElementSibling as HTMLElement;
  console.dir(sibling);

  if (!sibling) return;

  if (sibling.tagName === 'INPUT') {
    sibling.focus();
    return;
  }

  const foundInput = sibling.querySelector('input');

  if (foundInput) foundInput.focus();
};

export const capitalize = (str: string) => {
  return str[0].toLocaleUpperCase() + str.slice(1);
};
