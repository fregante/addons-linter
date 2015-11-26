import * as messages from 'messages';
import { isLocalCSSUri } from 'utils';


export function detectBadMozBindingURL(cssContent, filename,
                                       {startLine, startColumn}={}) {
  var messageList = [];
  if (cssContent.type === 'rule') {
    for (let declaration of cssContent.declarations) {
      if (declaration.property === '-moz-binding') {
        if (isLocalCSSUri(declaration.value) === false) {
          messageList.push(
            Object.assign({}, messages.MOZ_BINDING_EXT_REFERENCE, {
              type: 'error',
              line: startLine,
              column: startColumn,
              file: filename,
            }));
        }
      }
    }
  }
  return messageList;
}
