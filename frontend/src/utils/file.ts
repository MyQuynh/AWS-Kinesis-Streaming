/**
 * To parse extension from file
 *
 * @param {File} file - File input with extension
 * @return {string} extension - Extension of the file
 */
// eslint-disable-next-line import/prefer-default-export
export const getFileExtension = (file: File): string => {
  const filename = file.name;
  const extension = filename.split('.').pop();

  // Check undefined filename
  if (typeof filename === 'undefined' || filename === null) {
    throw new Error('Unexpected filename. Cannot parse extension!');
  }

  // Check file without extension
  if (typeof extension === 'undefined' || extension === null) {
    throw new Error('Unexpected extension. Cannot parse extension!');
  }

  return extension;
};
