/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (inherits, Bundle) {

  function Token() {
    Bundle.call(this)
    this.id = null
    this.key = null
    this.algorithm = 'sha256'
    this.uid = null
    this.data = null
  }
  inherits(Token, Bundle)

  Token.randomTokenData = function (info, size) {
    return Bundle
      .random32Bytes()
      .then(Token.tokenDataFromBytes.bind(null, info, size))
  }

  Token.tokenDataFromBytes = function (info, size, bytes) {
    return Bundle
      .hkdf(bytes, info, null, size)
      .then(
        function (key) {
          return [bytes, key]
        }
      )
  }

  Token.fill = function (token, raw) {
    if (!raw) return null
    if (raw.value) raw = raw.value
    token.type = raw.type
    token.id = raw.id
    token.key = raw.key,
    token.uid = raw.uid
    token.data = raw.data,
    token.hmacKey = raw.hmacKey
    token.xorKey = raw.xorKey
    return token
  }

  return Token
}
