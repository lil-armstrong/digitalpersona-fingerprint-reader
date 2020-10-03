(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@digitalpersona/devices')) :
    typeof define === 'function' && define.amd ? define(['@digitalpersona/devices'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fpController = factory(global.dp.devices));
}(this, (function (devices) { 'use strict';

    /**
     * Provides a way to construct sanitized URLs from a base URL, a path and a query object
     */
    var Url =
    /** @class */
    function () {
      /** Constructs an URL object from a base URL, a path and a query object.
       * @param base - base URL, e.g. `https://contoso.com`
       * @param path - optional path, e.g. `api/v1/user`
       * @param query - optional set of query parameters, e.g. `{ name: "john", type: "5" }`
       * @remarks
       * The URL is built by concatenation of a base URL with sanitized path and query object,
       * adding all needed delimiters. Example:
       * @example
       * ```
       * const url = new Url("https://contoso.com", "api/v1/user", { name: "john", type: "5" });
       * console.log(url.href);
       * > https://contoso.com/api/v1/user?name=john&type=5
       * ```
       */
      function Url(base, path, query) {
        this.href = Url.create(base, path, query);
      }
      /** Builds a sanitized URL query from an JS object.
       * @returns A hyperlink reference.
       */


      Url.getSanitizedQuery = function (query) {
        return Object.keys(query).map(function (key) {
          return [key, query[key]].map(encodeURIComponent).join("=");
        }).join("&");
      };
      /** Constructs an URL string from a base URL, a path and a query object.
       * @param base - base URL, e.g. `https://contoso.com`
       * @param path - optional path, e.g. `api/v1/user`
       * @param query - optional set of query parameters, e.g. `{ name: "john", type: "5" }`
       * @remarks
       * The URL is built by concatenation of a base URL with sanitized path and query object,
       * adding all needed delimiters.
       * @example
       * ```typescript
       * const href = Url.create("https://contoso.com", "api/v1/user", { name: "john", type: "5" });
       * console.log(href);
       * ```
       * `> https://contoso.com/api/v1/user?name=john&type=5`
       */


      Url.create = function (base, path, query) {
        return base + (path ? "/" + encodeURI(path) : "") + (query ? "?" + Url.getSanitizedQuery(query) : "");
      };

      return Url;
    }();

    /**
     * Biometric factors.
     */
    var BioFactor;

    (function (BioFactor) {
      BioFactor[BioFactor["Multiple"] = 1] = "Multiple";
      BioFactor[BioFactor["FacialFeatures"] = 2] = "FacialFeatures";
      BioFactor[BioFactor["Voice"] = 4] = "Voice";
      BioFactor[BioFactor["Fingerprint"] = 8] = "Fingerprint";
      BioFactor[BioFactor["Iris"] = 16] = "Iris";
      BioFactor[BioFactor["Retina"] = 32] = "Retina";
      BioFactor[BioFactor["HandGeometry"] = 64] = "HandGeometry";
      BioFactor[BioFactor["SignatureDynamics"] = 128] = "SignatureDynamics";
      BioFactor[BioFactor["KeystrokeDynamics"] = 256] = "KeystrokeDynamics";
      BioFactor[BioFactor["LipMovement"] = 512] = "LipMovement";
      BioFactor[BioFactor["ThermalFaceImage"] = 1024] = "ThermalFaceImage";
      BioFactor[BioFactor["ThermalHandImage"] = 2048] = "ThermalHandImage";
      BioFactor[BioFactor["Gait"] = 4096] = "Gait";
    })(BioFactor || (BioFactor = {}));
    /**
     * Biometric owner ID registered with {@link http://www.ibia.org/base/cbeff/_biometric_org.phpx | IBIA}.
     */


    var BioSampleFormatOwner;

    (function (BioSampleFormatOwner) {
      BioSampleFormatOwner[BioSampleFormatOwner["None"] = 0] = "None";
      /** Neurotechnologija (fingerprints). */

      BioSampleFormatOwner[BioSampleFormatOwner["Neurotechnologija"] = 49] = "Neurotechnologija";
      /** DigitalPersona (fingerprints) */

      BioSampleFormatOwner[BioSampleFormatOwner["DigitalPersona"] = 51] = "DigitalPersona";
      /** Cognitec (face) */

      BioSampleFormatOwner[BioSampleFormatOwner["Cognitec"] = 99] = "Cognitec";
      /** Innovatrics (face) */

      BioSampleFormatOwner[BioSampleFormatOwner["Innovatrics"] = 53] = "Innovatrics";
    })(BioSampleFormatOwner || (BioSampleFormatOwner = {}));
    /**
     * Biometric sample format info.
     */


    var BioSampleFormat =
    /** @class */
    function () {
      function BioSampleFormat(FormatOwner, FormatID) {
        this.FormatOwner = FormatOwner;
        this.FormatID = FormatID;
      }

      return BioSampleFormat;
    }();
    /**
     * A representation type of a biometric sample.
     */

    var BioSampleType;

    (function (BioSampleType) {
      BioSampleType[BioSampleType["Raw"] = 1] = "Raw";
      BioSampleType[BioSampleType["Intermediate"] = 2] = "Intermediate";
      BioSampleType[BioSampleType["Processed"] = 4] = "Processed";
      BioSampleType[BioSampleType["RawWSQCompressed"] = 8] = "RawWSQCompressed";
      BioSampleType[BioSampleType["Encrypted"] = 16] = "Encrypted";
      BioSampleType[BioSampleType["Signed"] = 32] = "Signed";
    })(BioSampleType || (BioSampleType = {}));
    /**
     * A purpose the biometric sample was intended for.
     */


    var BioSamplePurpose;

    (function (BioSamplePurpose) {
      BioSamplePurpose[BioSamplePurpose["Any"] = 0] = "Any";
      BioSamplePurpose[BioSamplePurpose["Verify"] = 1] = "Verify";
      BioSamplePurpose[BioSamplePurpose["Identify"] = 2] = "Identify";
      BioSamplePurpose[BioSamplePurpose["Enroll"] = 3] = "Enroll";
      BioSamplePurpose[BioSamplePurpose["EnrollForVerificationOnly"] = 4] = "EnrollForVerificationOnly";
      BioSamplePurpose[BioSamplePurpose["EnrollForIdentificationOnly"] = 5] = "EnrollForIdentificationOnly";
      BioSamplePurpose[BioSamplePurpose["Audit"] = 6] = "Audit";
    })(BioSamplePurpose || (BioSamplePurpose = {}));
    /**
     * A biometric sample encryption type.
     */


    var BioSampleEncryption;

    (function (BioSampleEncryption) {
      BioSampleEncryption[BioSampleEncryption["None"] = 0] = "None";
      BioSampleEncryption[BioSampleEncryption["XTEA"] = 1] = "XTEA";
    })(BioSampleEncryption || (BioSampleEncryption = {}));
    /**
     * Contains meta-information about biometric sample data.
     */


    var BioSampleHeader =
    /** @class */
    function () {
      function BioSampleHeader(
      /** Biometric factor. Must be set to 8 for fingerprint. */
      Factor,
      /** Format owner (vendor) information. */
      Format,
      /** Biometric sample representation type. */
      Type,
      /** Purpose of the biometric sample. */
      Purpose,
      /** Quality of biometric sample. If we don't support quality it should be set to -1.  */
      Quality,
      /** Encryption of biometric sample. */
      Encryption) {
        this.Factor = Factor;
        this.Format = Format;
        this.Type = Type;
        this.Purpose = Purpose;
        this.Quality = Quality;
        this.Encryption = Encryption;
      }

      return BioSampleHeader;
    }();
    /**
     * A biometric sample.
     */

    var BioSample =
    /** @class */
    function () {
      function BioSample(
      /** Biometric sample header. */
      Header,
      /** Base64url encoded biometric sample data */
      Data) {
        this.Header = Header;
        this.Data = Data;
        /** A version info. */

        this.Version = 1;
      }

      return BioSample;
    }();

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };
    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }
    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

      return ar;
    }

    // tslint:disable: ban-types
    /**
     * Set of converters to UTF16.
     */

    var Utf16 =
    /** @class */
    function () {
      function Utf16() {}
      /** Converts a UTF8 string to a UTF16 string. */


      Utf16.fromUtf8 = function (s) {
        return decodeURIComponent(escape(Utf8.noBom(s)));
      };
      /** Decodes a Base64-encoded string to a UTF16 string. */


      Utf16.fromBase64 = function (s) {
        return Utf16.fromUtf8(Utf8.fromBase64(s));
      };
      /** Decodes a Base64url-encoded string to a UTF16 string. */


      Utf16.fromBase64Url = function (s) {
        return Utf16.fromUtf8(Utf8.fromBase64Url(s));
      };
      /** Appends Byte-Order-Mark (BOM) to the UTF16 string. */


      Utf16.withBom = function (s) {
        return "\uFEFF" + s;
      };
      /** Strips a Byte-Order-Mark (BOM) from the UTF16 string. */


      Utf16.noBom = function (s) {
        return s.replace(/^\uFEFF/, "");
      };

      return Utf16;
    }();
    /**
     * Set of converters to UTF8.
     */

    var Utf8 =
    /** @class */
    function () {
      function Utf8() {}
      /** Converts a UTF16 string to a UTF16 string. */


      Utf8.fromUtf16 = function (s) {
        return unescape(encodeURIComponent(Utf16.noBom(s)));
      };
      /** Decodes a Base64-encoded string to a UTF8 string. */


      Utf8.fromBase64 = function (s) {
        return atob(s);
      };
      /** Decodes a Base64url-encoded string to a UTF8 string. */


      Utf8.fromBase64Url = function (s) {
        return Utf8.fromBase64(Base64.fromBase64Url(s));
      };
      /** Converts a byte array to a UTF16 string. */


      Utf8.fromBytes = function (bytes) {
        return String.fromCharCode.apply(String, __spread(bytes));
      };
      /** Appends Byte-Order-Mark (BOM) to the UTF8 string. */


      Utf8.withBom = function (s) {
        return "\xEF\xBB\xBF" + s;
      };
      /** Strips a Byte-Order-Mark (BOM) from the UTF8 string. */


      Utf8.noBom = function (s) {
        return s.replace(/^\xEF\xBB\xBF/, "");
      };

      return Utf8;
    }();
    /**
     * Set of converters to Base64.
     */

    var Base64 =
    /** @class */
    function () {
      function Base64() {}
      /** Encodes a UTF8 string to a Base64-encoded string. */


      Base64.fromUtf8 = function (s) {
        return btoa(s);
      };
      /** Encodes a UTF16 string to a Base64-encoded string.  */


      Base64.fromUtf16 = function (s) {
        return Base64.fromUtf8(Utf8.fromUtf16(s));
      };
      /** Converts a Base64url-encoded string to a Base64-encoded string. */


      Base64.fromBase64Url = function (s) {
        return (s.length % 4 === 2 ? s + "==" : s.length % 4 === 3 ? s + "=" : s).replace(/-/g, "+").replace(/_/g, "/");
      };
      /** Converts a byte array to a Base64-encoded string. */


      Base64.fromBytes = function (bytes) {
        return Base64.fromUtf8(Utf8.fromBytes(bytes));
      };
      /** Encodes a plain JSON object or a string to a Base64-encoded string. */


      Base64.fromJSON = function (obj) {
        return Base64.fromUtf16(JSON.stringify(obj));
      };

      return Base64;
    }();
    /**
     * Set of converters to Base64Url.
     */

    var Base64Url =
    /** @class */
    function () {
      function Base64Url() {}
      /** Converts a Base64-encoded string to a Base64url-encoded string. */


      Base64Url.fromBase64 = function (s) {
        return s.replace(/\=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      };
      /** Converts a UTF8 string to a Base64url-encoded string. */


      Base64Url.fromUtf8 = function (s) {
        return Base64Url.fromBase64(Base64.fromUtf8(s));
      };
      /** Converts a UTF16 string to a Base64url-encoded string. */


      Base64Url.fromUtf16 = function (s) {
        return Base64Url.fromBase64(Base64.fromUtf16(s));
      };
      /** Converts a byte array to a Base64url-encoded string. */


      Base64Url.fromBytes = function (bytes) {
        return Base64Url.fromUtf8(Utf8.fromBytes(bytes));
      };
      /** Encodes a plain JSON object or a string to a Base64url-encoded string. */


      Base64Url.fromJSON = function (obj) {
        return Base64Url.fromUtf16(JSON.stringify(obj));
      };

      return Base64Url;
    }();
    /**
     * Set of converters to Base32.
     */

    var Base32 =
    /** @class */
    function () {
      function Base32() {}
      /** Converts a byte array to a Base32-encoded string. */


      Base32.fromBytes = function (bytes) {
        var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var v1 = 0,
            v2 = 0,
            v3 = 0,
            v4 = 0,
            v5 = 0,
            str = '',
            l = bytes.length,
            i = 0;
        var count = Math.floor(l / 5) * 5;

        while (i < count) {
          v1 = bytes[i++];
          v2 = bytes[i++];
          v3 = bytes[i++];
          v4 = bytes[i++];
          v5 = bytes[i++];
          str += digits[v1 >>> 3] + digits[(v1 << 2 | v2 >>> 6) & 31] + digits[v2 >>> 1 & 31] + digits[(v2 << 4 | v3 >>> 4) & 31] + digits[(v3 << 1 | v4 >>> 7) & 31] + digits[v4 >>> 2 & 31] + digits[(v4 << 3 | v5 >>> 5) & 31] + digits[v5 & 31];
        } // remain char


        var remain = l - count;
        if (remain === 0) return str;

        switch (remain) {
          // @ts-ignore no-switch-case-fall-through
          case 4:
            v4 = bytes[--l];
          // @ts-ignore no-switch-case-fall-through

          case 3:
            v3 = bytes[--l];
          // @ts-ignore no-switch-case-fall-through

          case 2:
            v2 = bytes[--l];
          // @ts-ignore no-switch-case-fall-through

          case 1:
            v1 = bytes[--l];
        }

        str += digits[v1 >>> 3];

        switch (remain) {
          case 1:
            return str + digits[v1 << 2 & 31] + '======';

          case 2:
            return str + digits[(v1 << 2 | v2 >>> 6) & 31] + digits[v2 >>> 1 & 31] + digits[v2 << 4 & 31] + '====';

          case 3:
            return str + digits[(v1 << 2 | v2 >>> 6) & 31] + digits[v2 >>> 1 & 31] + digits[(v2 << 4 | v3 >>> 4) & 31] + digits[v3 << 1 & 31] + '===';

          case 4:
            return str + digits[(v1 << 2 | v2 >>> 6) & 31] + digits[v2 >>> 1 & 31] + digits[(v2 << 4 | v3 >>> 4) & 31] + digits[(v3 << 1 | v4 >>> 7) & 31] + digits[v4 >>> 2 & 31] + digits[v4 << 3 & 31] + '=';
        }

        return str;
      };

      return Base32;
    }();
    // {
    //     public static encode = (s: string): HexString =>
    //         s.split("").map(cp => ('000' + cp.charCodeAt(0).toString(16)).slice(-4)).join('')
    //     public static decode = (s: HexString): string =>
    //         s.replace(/(..)/g, '%$1'))
    // }

    /** Enumerates supported username formats. */
    var UserNameType;

    (function (UserNameType) {
      /** A name not associated with any Windows account, to be used for local databases only.  */
      UserNameType[UserNameType["Unknown"] = 0] = "Unknown";
      /** NetBIOS domain name, for example, “THE_COMPANY”. */

      UserNameType[UserNameType["NetBIOSDomain"] = 1] = "NetBIOSDomain";
      /** A DNS domain name, for example, “thecompany.com”. */

      UserNameType[UserNameType["DNSDomain"] = 2] = "DNSDomain";
      /** A MS Windows account name, e.g “the_company\jdoe” (domain\user) or "the_company\" (domain only). */

      UserNameType[UserNameType["SAM"] = 3] = "SAM";
      /** The account name format used in Microsoft(r) Windows NT(r) 4.0, for example, “jdoe”.  */

      UserNameType[UserNameType["Simple"] = 4] = "Simple";
      /** A GUID string, for example, “4fa050f0-f561-11cf-bdd9-00aa003a77b6”.  */

      UserNameType[UserNameType["UID"] = 5] = "UID";
      /** A user principal name, for example, “jdoe@thecompany.com”.  */

      UserNameType[UserNameType["UPN"] = 6] = "UPN";
      /** A friendly display name, for example, “John Doe”. */

      UserNameType[UserNameType["Display"] = 7] = "Display";
      /** A user SID string, for example, “S-1-5-21-1004”. */

      UserNameType[UserNameType["SID"] = 8] = "SID";
      /** A user name associated with DigitalPersona identity database (formerly known as "Altus user"). */

      UserNameType[UserNameType["DP"] = 9] = "DP";
    })(UserNameType || (UserNameType = {}));

    /**
     * Represents a user's identity using a user's name name and a type of the name.
     * This class is typially used to pass a user name during authentication.
     */

    var User =
    /** @class */
    function () {
      /** Constructs the object using a username and a user type.
       * @param name - user name. No name transformation/canonicalization is performed.
       * @param type - an optional type of the user. If not provided, he type is deduced automatically.
       * @remarks
       * If no `type` parameter is provided, the username format is analyzes and automatic type is assigned.
       * For example:
       * * "user\@comtoso.com" name will be parsed as a {@link UserNameType.UPN | User Principal Name (UPN)},
       * * "Domain\\UserX" name will be parsed as a {@link UserNameType.SAM | Security Account Manager (SAM)} name,
       * * "6de5b5ed-85fc-4298-a18b-dac7d5a18369" will be parsed as a {@link UserNameType.UID | Unique Identifier (UID)} name,
       * * "UserX" name will be parsed as a {@link UserNameType.DP | DigitalPersona name} (used in LDS)
       * You may provide a `type` parameter if you want to enforce a specific name type.
       */
      function User(name, type) {
        var reGUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        this.name = name || "";
        this.type = type || (this.name.length === 0 ? UserNameType.Unknown : this.name === "*" ? UserNameType.Unknown : this.name.indexOf('@') !== -1 ? UserNameType.UPN : this.name.indexOf('\\') !== -1 ? UserNameType.SAM : reGUID.test(this.name) ? UserNameType.UID : UserNameType.DP);
      }
      /** @returns `true` when the User object represents an anonymous user. */


      User.prototype.isAnonymous = function () {
        return !this.name || this.name.length === 0;
      };
      /** @returns `true` whrn the user object represents any user. */


      User.prototype.isEveryone = function () {
        return this.name === "*";
      };
      /** Creates a user object representing an anonymous user. */


      User.Anonymous = function () {
        return new User("", UserNameType.Unknown);
      };
      /** Creates a user object representing every user. */


      User.Everyone = function () {
        return new User("*", UserNameType.Unknown);
      };
      /** Creates a user object using claims in a JSON Web Token.
       * @param token - a JSON Web Token.
       * @param type - an optional username type to override automatic type detection and force a specific name format.
       * @returns a user object constructed from the `token` claims.
       * @remarks
       * The `token` should contain either {@link ClaimSet.sub |`sub`} or {@link ClaimSet.wan | `wan`} claim
       * to detect a user name. If no such claims are found, then {@link User.Anonymous | anonymous} user is returned.
       * The {@link ClaimSet.sub |`sub`} claim has a priority over the {@link ClaimSet.wan | `wan`} claim.
       * If `type` parameter is not defined, the name type is deduced automatically from the name string.
       * You may provide a `type` parameter if you want to enforce a specific name type.
       * See {@link User.constructor} for type deduction details.
       */


      User.fromJWT = function (token, type) {
        var claims = JWT.claims(token);
        var user = claims.sub && claims.sub instanceof User ? claims.sub : claims.wan ? new User(claims.wan, type) : claims.sub ? new User(claims.sub, type || UserNameType.DP) : User.Anonymous();
        return user;
      };

      return User;
    }();

    /** Represents a JSON Web Token Header. */

    var JWTHeader =
    /** @class */
    function () {
      /** Constructs a JWT header. */
      function JWTHeader(typ, alg, cty) {
        this.typ = typ;
        this.cty = cty;
        this.alg = alg;
      }

      return JWTHeader;
    }();
    /** Represents a JSON Web Token and gives access to the token's payload.
     * Note that this class does not allow to validate the token signature in the browser,
     * it must be done on a server side.
     */


    var JWT =
    /** @class */
    function () {
      function JWT() {}
      /** Extracts a claims set from the JSON Web Token.
       * @param jwt - a JSON Web Token string.
       * @returns a claims set.
       */


      JWT.claims = function (jwt) {
        var parts = jwt.split('.');
        var header = JSON.parse(Utf16.fromBase64Url(parts[0]));

        if (header.cty === "JWT") {
          // we have a nested JWT with encrypted payload (JWE).
          // Encrypted nested JWT may replicate some claims in the header to be publicly accessible.
          return __assign(__assign({}, header), new JWTHeader());
        } else {
          // unencrypted payload, use claims from the payload only
          var payload = JSON.parse(Utf16.fromBase64Url(parts[1])); // convert "subject" to a User type

          if (typeof payload.sub === "object") {
            var _a = payload.sub,
                name_1 = _a.name,
                type = _a.type;
            payload.sub = new User(name_1, type);
          }

          return payload;
        }
      };
      /** Validates the JSON Web Token and returns a collection of detected validation errors.
       * @param jwt - a JSON Web Token.
       * @returns an array of errors found, or `null` if the token is valid.
       * @remarks
       * Only client-side checks are performed, no signature validation.
       * The token's claims must satisfy following expression:
       * `iat <= nbf < now < exp`
       * where `iat` is time when the token was issued, `nbf` is a time when the token becomes valid,
       * `exp` is a token expiration time, `now` is current time.
       * Following errors may be returned:
       *
       *   * 'JWT.Error.IssueTimeLaterThanNotBefore' if `iat > nbf`,
       *   * 'JWT.Error.NotEffectiveYet' when `now < nbf`,
       *   * 'JWT.Error.Expired' when `now >= exp`.
       */


      JWT.errors = function (jwt) {
        var e = [];
        var claims = JWT.claims(jwt);
        var now = new Date().getTime() / 1000; // seconds since the epoch start
        // iat < nbf < now < exp

        if (claims.iat && claims.nbf && claims.iat > claims.nbf) e.push(new Error('JWT.Error.IssueTimeLaterThanNotBefore'));
        if (claims.nbf && claims.nbf > now) e.push(new Error('JWT.Error.NotEffectiveYet'));
        if (claims.exp && claims.exp <= now) e.push(new Error('JWT.Error.Expired'));
        return e.length > 0 ? e : null;
      };

      return JWT;
    }();

    /** Enumerate publicly registered and private DigitalPersona claim names. */
    var ClaimName;

    (function (ClaimName) {
      // registered names
      ClaimName["TokensId"] = "jti";
      ClaimName["IssuerName"] = "iss";
      ClaimName["IssuedAt"] = "iat";
      ClaimName["Audience"] = "aud";
      ClaimName["NotBefore"] = "nbf";
      ClaimName["ExpiresAfter"] = "exp";
      ClaimName["SubjectName"] = "sub"; // private DigitalPersona names

      ClaimName["IssuerDomain"] = "dom";
      ClaimName["SubjectUid"] = "uid";
      ClaimName["ADGuid"] = "ad_guid";
      ClaimName["CredentialsUsed"] = "crd";
      ClaimName["Group"] = "group";
      ClaimName["Role"] = "role";
      ClaimName["WindowsAccountName"] = "wan";
      ClaimName["T24Principal"] = "t24";
    })(ClaimName || (ClaimName = {}));

    /**
     * A structure wrapping a JSON Web Token to pass it to the DigitalPersona Web Components services.
     */
    var Ticket =
    /** @class */
    function () {
      /** Constructs a ticket object. */
      function Ticket(jwt) {
        this.jwt = jwt;
      }
      /** Creates a ticket with an emtpy token. Used as a placeholder when no token is needed. */


      Ticket.None = function () {
        return new Ticket("");
      };

      return Ticket;
    }();

    /**
     * Credential data.
     */

    var Credential =
    /** @class */
    function () {
      /** Constructs a credential. */
      function Credential(id, data, encode) {
        if (encode === void 0) {
          encode = true;
        }

        this.id = id;
        this.data = !data ? null : !encode ? JSON.stringify(data) : Base64Url.fromUtf16(typeof data !== "string" ? JSON.stringify(data) : data);
      }
      /** Constructs an empty credential object. */


      Credential.None = function () {
        return new Credential("");
      };
      /** Constructs a credential object representing any credential. */


      Credential.Any = function () {
        return new Credential("*");
      }; // true credentials


      Credential.Password = "D1A1F561-E14A-4699-9138-2EB523E132CC";
      Credential.Fingerprints = "AC184A13-60AB-40E5-A514-E10F777EC2F9";
      Credential.Face = "85AEAA44-413B-4DC1-AF09-ADE15892730A";
      Credential.SmartCard = "D66CC98D-4153-4987-8EBE-FB46E848EA98";
      Credential.ContactlessCard = "F674862D-AC70-48CA-B73E-64A22F3BAC44";
      Credential.ProximityCard = "1F31360C-81C0-4EE0-9ACD-5A4400F66CC2";
      Credential.PIN = "8A6FCEC3-3C8A-40C2-8AC0-A039EC01BA05";
      Credential.SecurityQuestions = "B49E99C6-6C94-42DE-ACD7-FD6B415DF503";
      Credential.Bluetooth = "E750A180-577B-47F7-ACD9-F89A7E27FA49";
      Credential.OneTimePassword = "324C38BD-0B51-4E4D-BD75-200DA0C8177F";
      Credential.U2F = "5D5F73AF-BCE5-4161-9584-42A61AED0E48";
      Credential.IWA = "AE922666-9667-49BC-97DA-1EB0E1EF73D2";
      Credential.Email = "7845D71D-AB67-4EA7-913C-F81E75C3A087";
      Credential.Behavior = "193C41F6-5CF6-4525-84CC-223603DAC9AB"; // pseudo-credentials

      Credential.Cards = "FCFA704C-144B-42DB-8DF3-13F5CD20C525"; // all card types

      return Credential;
    }();

    /**
     * Positions of fingers.
     */
    var FingerPosition;

    (function (FingerPosition) {
      FingerPosition[FingerPosition["Unknown"] = 0] = "Unknown";
      FingerPosition[FingerPosition["RightThumb"] = 1] = "RightThumb";
      FingerPosition[FingerPosition["RightIndex"] = 2] = "RightIndex";
      FingerPosition[FingerPosition["RightMiddle"] = 3] = "RightMiddle";
      FingerPosition[FingerPosition["RightRing"] = 4] = "RightRing";
      FingerPosition[FingerPosition["RightLittle"] = 5] = "RightLittle";
      FingerPosition[FingerPosition["LeftThumb"] = 6] = "LeftThumb";
      FingerPosition[FingerPosition["LeftIndex"] = 7] = "LeftIndex";
      FingerPosition[FingerPosition["LeftMiddle"] = 8] = "LeftMiddle";
      FingerPosition[FingerPosition["LeftRing"] = 9] = "LeftRing";
      FingerPosition[FingerPosition["LeftLittle"] = 10] = "LeftLittle";
    })(FingerPosition || (FingerPosition = {}));
    /** Finger enrollment data. */


    var Finger =
    /** @class */
    function () {
      function Finger(
      /** Finger position. */
      position) {
        this.position = position;
      }
      /** Creates the finger enrollment data from a plain JSON object. */


      Finger.fromJson = function (json) {
        var obj = json;
        return new Finger(obj.position);
      };

      return Finger;
    }();

    /**
     * Format of a face image sample.
     */


    var FaceImageType;

    (function (FaceImageType) {
      FaceImageType[FaceImageType["Jpeg"] = 1] = "Jpeg";
    })(FaceImageType || (FaceImageType = {}));
    /**
     * Face image data.
     */


    var FaceImage =
    /** @class */
    function () {
      function FaceImage(
      /** Base64url-encoded image data. */
      ImageData,
      /** Image format. */
      ImageType) {
        if (ImageType === void 0) {
          ImageType = FaceImageType.Jpeg;
        }

        this.ImageData = ImageData;
        this.ImageType = ImageType;
        /** Version info. */

        this.Version = 1;
      }
      /** Extracts face image from a data URL. Only `data:image/jpeg;base64` is supported for now. */


      FaceImage.fromDataURL = function (image) {
        return new FaceImage(image.replace("data:image/jpeg;base64,", ""));
      };
      /** Extracts face image from a browser's canvas object.  */


      FaceImage.fromCanvas = function (canvas, quality) {
        if (quality === void 0) {
          quality = 1.0;
        }

        return FaceImage.fromDataURL(canvas.toDataURL("image/jpeg", quality));
      };
      /** Exports the face image data to a {@link BioSample} object. */


      FaceImage.prototype.toBioSample = function (format, purpose, sdkVersion) {
        if (format === void 0) {
          format = new BioSampleFormat(BioSampleFormatOwner.None, 0);
        }

        if (purpose === void 0) {
          purpose = BioSamplePurpose.Any;
        }

        return new BioSample(new BioSampleHeader(BioFactor.FacialFeatures, format, BioSampleType.Raw, purpose, -1, BioSampleEncryption.None), Base64Url.fromJSON(this));
      };

      return FaceImage;
    }();

    /**
     * Type of a security question.
     */
    var QuestionType;

    (function (QuestionType) {
      /** A security question from a standard predefined list of questions ({@link Question.number} <= 100). */
      QuestionType[QuestionType["Regular"] = 0] = "Regular";
      /** A user-defined security question ({@link Question.number} > 100). */

      QuestionType[QuestionType["Custom"] = 1] = "Custom";
    })(QuestionType || (QuestionType = {}));
    /**
     * Security question data.
     */


    var Question =
    /** @class */
    function () {
      /** Constructs a security question. */
      function Question(
      /** An index of a question in a question list. */
      number,
      /** A question language ID. */
      lang_id,
      /** A question sublanguage ID. */
      sublang_id,
      /** A keyboard layout for the answer. */
      keyboard_layout,
      /** A text of the security question (only when {@link Question.type} === {@link QuestionType.Custom}) */
      text) {
        this.number = number;
        this.lang_id = lang_id;
        this.sublang_id = sublang_id;
        this.keyboard_layout = keyboard_layout;
        this.text = text;
        /** Version info. */

        this.version = 1;
        this.type = number <= 100 ? QuestionType.Regular : QuestionType.Custom;
        if (this.type === QuestionType.Custom && !text) throw new Error("Question text is required for custom questions");
      }
      /** Creates a security question from a plain JSON object. */


      Question.fromJson = function (json) {
        var obj = json;
        return new Question(obj.number, obj.lang_id, obj.sublang_id, obj.keyboard_layout, obj.text);
      };

      return Question;
    }();

    /** @internal */

    var Enroller =
    /** @class */
    function () {
      function Enroller(context) {
        this.context = context;
        if (!this.context) throw new Error("context");
      }

      Enroller.prototype._canEnroll = function (credId) {
        return this.context.enrollService.IsEnrollmentAllowed(new Ticket(this.context.securityOfficer || ""), this.context.getUser(), credId);
      };

      Enroller.prototype._enroll = function (credential) {
        if (this.context.user instanceof User) {
          return this.context.enrollService.EnrollAltusUserCredentials(new Ticket(this.context.securityOfficer || ""), this.context.user, credential);
        } else {
          return this.context.enrollService.EnrollUserCredentials(new Ticket(this.context.securityOfficer || ""), new Ticket(this.context.user), credential);
        }
      };

      Enroller.prototype._unenroll = function (credential) {
        if (this.context.user instanceof User) {
          return this.context.enrollService.DeleteAltusUserCredentials(new Ticket(this.context.securityOfficer || ""), this.context.user, credential);
        } else {
          return this.context.enrollService.DeleteUserCredentials(new Ticket(this.context.securityOfficer || ""), new Ticket(this.context.user), credential);
        }
      };

      return Enroller;
    }();

    /**
     * Smartcard enrollment API.
     */

    var SmartCardEnroll =
    /** @class */
    function (_super) {
      __extends(SmartCardEnroll, _super);
      /** Constructs a new smartcard enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function SmartCardEnroll(context) {
        return _super.call(this, context) || this;
      }
      /** Reads a list of enrolled cards.
       * @returns a promise to return a list of user's enrolled cards.
       */


      SmartCardEnroll.prototype.getEnrolledCards = function () {
        return this.context.enrollService.GetEnrollmentData(this.context.getUser(), Credential.SmartCard).then(function (data) {
          return JSON.parse(Utf8.fromBase64Url(data));
        });
      };
      /** Reads a card enrollment availability.
       * @returns a fulfilled promise when a card can be enrolled, a rejected promise otherwise.
       */


      SmartCardEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.SmartCard);
      };
      /** Enrolls a card.
       * @param cardData - a card enrollment data obtained using {@link CardsReader.getCardEnrollData}.
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      SmartCardEnroll.prototype.enroll = function (cardData) {
        return _super.prototype._enroll.call(this, new Credential(Credential.SmartCard, cardData));
      };
      /**
       * Deletes a specific smart card enrollment defined by its pubilc key hash.
       * @param keyHash - a key hash of the card. If not provided, all smartcard enrollments will be deleted.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      SmartCardEnroll.prototype.unenroll = function (keyHash) {
        return _super.prototype._unenroll.call(this, new Credential(Credential.SmartCard, keyHash));
      };

      return SmartCardEnroll;
    }(Enroller);
    /**
     * Contactless card enrollment API.
     */

    var ContactlessCardEnroll =
    /** @class */
    function (_super) {
      __extends(ContactlessCardEnroll, _super);
      /** Constructs a new contactless card enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function ContactlessCardEnroll(context) {
        return _super.call(this, context) || this;
      }
      /** Reads a card enrollment availability.
       * @returns a fulfilled promise when a card can be enrolled, a rejected promise otherwise.
       */


      ContactlessCardEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.ContactlessCard);
      };
      /** Enrolls a card.
       * @param cardData - a card enrollment data obtained using {@link CardsReader.getCardEnrollData}.
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      ContactlessCardEnroll.prototype.enroll = function (cardData) {
        return _super.prototype._enroll.call(this, new Credential(Credential.ContactlessCard, cardData));
      };
      /** Deletes the card enrollment.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      ContactlessCardEnroll.prototype.unenroll = function () {
        return _super.prototype._unenroll.call(this, new Credential(Credential.ContactlessCard));
      };

      return ContactlessCardEnroll;
    }(Enroller);
    /**
     * Proximity card enrollment API.
     */

    var ProximityCardEnroll =
    /** @class */
    function (_super) {
      __extends(ProximityCardEnroll, _super);
      /** Constructs a new proximity card enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function ProximityCardEnroll(context) {
        return _super.call(this, context) || this;
      }
      /** Reads a card enrollment availability.
       * @returns a fulfilled promise when a card can be enrolled, a rejected promise otherwise.
       */


      ProximityCardEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.ProximityCard);
      };
      /** Enrolls a card.
       * @param cardData - a card enrollment data obtained using {@link CardsReader.getCardEnrollData}.
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      ProximityCardEnroll.prototype.enroll = function (cardData) {
        return _super.prototype._enroll.call(this, new Credential(Credential.ProximityCard, cardData));
      };
      /** Deletes the card enrollment.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      ProximityCardEnroll.prototype.unenroll = function () {
        return _super.prototype._unenroll.call(this, new Credential(Credential.ProximityCard));
      };

      return ProximityCardEnroll;
    }(Enroller);

    /**
     * Face enrollment API.
     */

    var FaceEnroll =
    /** @class */
    function (_super) {
      __extends(FaceEnroll, _super);
      /** Constructs a new face enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function FaceEnroll(context) {
        return _super.call(this, context) || this;
      }
      /** Reads a face enrollment availability.
       * @returns a fulfilled promise when a face can be enrolled, a rejected promise otherwise.
       */


      FaceEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.Face);
      };
      /** Enrolls a face.
       * @param samples - a collection of face images.
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      FaceEnroll.prototype.enroll = function (samples) {
        return _super.prototype._enroll.call(this, new Credential(Credential.Face, samples));
      };
      /** Deletes the face enrollment.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      FaceEnroll.prototype.unenroll = function () {
        return _super.prototype._unenroll.call(this, new Credential(Credential.Face));
      };

      return FaceEnroll;
    }(Enroller);

    /**
     * Fingerprint enrollment API.
     */

    var FingerprintsEnroll =
    /** @class */
    function (_super) {
      __extends(FingerprintsEnroll, _super);
      /** Constructs a new fingerprint enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function FingerprintsEnroll(context) {
        return _super.call(this, context) || this;
      }
      /** Reads a fingerprint enrollment status.
       * @returns a promise to return fingerprint enrollment data. The data is a collection of enrolled fingers.
       */


      FingerprintsEnroll.prototype.getEnrolledFingers = function () {
        return this.context.enrollService.GetEnrollmentData(this.context.getUser(), Credential.Fingerprints).then(function (data) {
          return JSON.parse(Utf8.fromBase64Url(data)).map(function (item) {
            return Finger.fromJson(item);
          });
        });
      };
      /** Reads a fingerprint enrollment availability.
       * @returns a fulfilled promise when fingerprints can be enrolled, a rejected promise otherwise.
       */


      FingerprintsEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.Fingerprints);
      };
      /** Enrolls a fingerprint.
       * @param position - a position of a finger to enroll
       * @param samples - a collection of fingerprint scans.
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      FingerprintsEnroll.prototype.enroll = function (position, samples) {
        var data = {
          position: position instanceof Finger ? position.position : position,
          samples: samples
        };
        return _super.prototype._enroll.call(this, new Credential(Credential.Fingerprints, data));
      };
      /** Deletes the fingerprint enrollment.
       * @param position - a position(s) of a finger(s) to delete.
       *                   If not defined, all enrolled fingerprintss will be deleted.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      FingerprintsEnroll.prototype.unenroll = function (position) {
        var data = typeof position === "number" ? [{
          position: position
        }] : position instanceof Finger ? [position] : position instanceof Array ? position.map(function (p) {
          return p instanceof Finger ? p.position : p;
        }) : null;
        return _super.prototype._unenroll.call(this, new Credential(Credential.Fingerprints, data));
      };

      return FingerprintsEnroll;
    }(Enroller);

    /** @internal */
    var CustomAction;

    (function (CustomAction) {
      CustomAction[CustomAction["SendEmailVerificationRequest"] = 16] = "SendEmailVerificationRequest";
      CustomAction[CustomAction["SendSMSRequest"] = 513] = "SendSMSRequest";
      CustomAction[CustomAction["SendEmailRequest"] = 514] = "SendEmailRequest";
      CustomAction[CustomAction["UnlockActiveIdHardwareToken"] = 515] = "UnlockActiveIdHardwareToken";
    })(CustomAction || (CustomAction = {}));

    /**
     * One-time password enrollment API.
     */

    var TimeOtpEnroll =
    /** @class */
    function (_super) {
      __extends(TimeOtpEnroll, _super);
      /** Constructs a new One-Time Password enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function TimeOtpEnroll(context) {
        return _super.call(this, context) || this;
      }
      /**
       * Converts a secret key to a Key URI, which will be encode as a QR Code image to scan.
       * @param key - a secret key to convert to a Key URI string.
       * @returns - a promise to return a Key URI string
       * @remarks
       * For Push Notifications fo AD users, make sure the user's token has an `ad_guid` claim.
       * You may need to use `ClaimsService.GetClaims()` method to append this claim to an existing token.
       */


      TimeOtpEnroll.prototype.createKeyUri = function (key) {
        var type = "totp";
        var jwt = this.context.getJWT();
        var claims = JWT.claims(jwt);
        if (!claims) return Promise.reject(new Error('NoClaims'));
        var issuer = claims.dom || claims.iss; // will be used as a prefix of a label

        if (!issuer) return Promise.reject(new Error('NoIssuer'));
        var uid = claims.uid || claims["ad_guid"]; // required for Push OTP. Also needs TenantID.

        var username = this.context.getUser().name;
        var secret = Base32.fromBytes(key);
        return this.context.enrollService.GetEnrollmentData(User.Anonymous(), Credential.OneTimePassword).then(function (data) {
          var otpData = JSON.parse(data);
          if (!otpData) return Promise.reject(new Error("NoEnrollmentData"));
          var pushSupported = uid && otpData.pn_tenant_id;
          var uri = new Url("otpauth://" + type, issuer + ":" + username, {
            secret: secret,
            issuer: issuer,
            apikey: otpData.pn_api_key,
            tenantid: pushSupported ? otpData.pn_tenant_id : undefined,
            useruuid: pushSupported ? uid : undefined
          });
          return uri.href;
        });
      };
      /**
       * Sends an verification code using SMS to the user's device.
       * @param key - a secret key to "seed" an OTP generator and start generating verification codes.
       * @param phoneNumber - a phone number to send a current verification code to.
       */


      TimeOtpEnroll.prototype.sendVerificationCode = function (key, phoneNumber) {
        return this.context.enrollService.CustomAction(Ticket.None(), this.context.getUser(), new Credential(Credential.OneTimePassword, {
          key: Base64Url.fromBytes(key),
          phoneNumber: phoneNumber
        }), CustomAction.SendSMSRequest).then();
      };
      /**
       * Enrolls One-Time Password using a software TOTP (e.g. DigitalPersona app, Google Authenticator etc.)
       * @param code - a verification code entered by a user.
       * @param key - a secret key used to "seed" an OTP generator.
       * @param phoneNumber - a phone number the verification code was sent to
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      TimeOtpEnroll.prototype.enrollSoftwareOtp = function (code, key, phoneNumber) {
        return _super.prototype._enroll.call(this, new Credential(Credential.OneTimePassword, {
          otp: code,
          key: Base64Url.fromBytes(key),
          phoneNumber: phoneNumber
        }));
      };
      /**
       * Enrolls a hardware TOTP token.
       * @param code - a verification code entered by a user.
       * @param serialNumber - a serial number of the TOTP token.
       * @param counter - an optional counter displayed on some token models.
       * @param timer - an optional timer displayed on some token models
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      TimeOtpEnroll.prototype.enrollHardwareOtp = function (code, serialNumber, counter, timer) {
        return _super.prototype._enroll.call(this, new Credential(Credential.OneTimePassword, {
          otp: code,
          serialNumber: serialNumber,
          counter: counter,
          timer: timer
        }));
      };
      /** Deletes the OTP enrollment.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      TimeOtpEnroll.prototype.unenroll = function () {
        return _super.prototype._unenroll.call(this, new Credential(Credential.OneTimePassword));
      };

      return TimeOtpEnroll;
    }(Enroller);

    /** @internal */
    var CustomAction$1;

    (function (CustomAction) {
      CustomAction[CustomAction["PasswordRandomization"] = 4] = "PasswordRandomization";
      CustomAction[CustomAction["PasswordReset"] = 13] = "PasswordReset";
    })(CustomAction$1 || (CustomAction$1 = {}));

    /**
     * Password enrollment API.
     * @remarks
     * As a primary credential, user's password cannot be unenroled, it can only be changed, reset or randomized.
     */

    var PasswordEnroll =
    /** @class */
    function (_super) {
      __extends(PasswordEnroll, _super);
      /** Constructs a new password enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function PasswordEnroll(context) {
        return _super.call(this, context) || this;
      }
      /** Reads a password change availability.
       * @returns a fulfilled promise when a password can be changed, a rejected promise otherwise.
       */


      PasswordEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.Password);
      };
      /**
       * Changes a password.
       * @param newPassword - a new password.
       * @param oldPassword - a password to replace. Must match the existing password.
       * @returns a promise to perform the password change or reject in case of an error.
       */


      PasswordEnroll.prototype.enroll = function (newPassword, oldPassword) {
        return _super.prototype._enroll.call(this, new Credential(Credential.Password, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }));
      };
      /**
       * Resets a password.
       * @param newPassword - a new password which will replace any existing password.
       * @returns a promise to perform the password reset or reject in case of an error.
       * @remarks
       * DigitalPersona AD Server supports password randomization only for ActiveDirectory users.
       * DigitalPersona LDS Server supports password randomization only for DigitalPersona users (formerly "Altus Users").
       */


      PasswordEnroll.prototype.reset = function (newPassword) {
        return _super.prototype._enroll.call(this, new Credential(Credential.Password, newPassword));
      };
      /**
       * Creates a new strong password with good complexity properties.
       * @returns a promise to return a randomized password.
       * @remarks
       * DigitalPersona AD Server supports password randomization only for ActiveDirectory users.
       * DigitalPersona LDS Server supports password randomization only for DigitalPersona users (formerly "Altus Users").
       */


      PasswordEnroll.prototype.randomize = function () {
        return this.context.enrollService.CustomAction(new Ticket(this.context.securityOfficer || ""), this.context.getUser(), new Credential(Credential.Password), CustomAction$1.PasswordRandomization);
      };

      return PasswordEnroll;
    }(Enroller);

    /**
     * Personal Identification Number (PIN) enrollment API.
     */

    var PinEnroll =
    /** @class */
    function (_super) {
      __extends(PinEnroll, _super);
      /** Constructs a new PIN enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function PinEnroll(context) {
        return _super.call(this, context) || this;
      }
      /** Reads a PIN enrollment availability.
       * @returns a fulfilled promise when a PIN can be enrolled, a rejected promise otherwise.
       */


      PinEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.PIN);
      };
      /** Enrolls a PIN.
       * @param pin - a Personal Identification Number (PIN).
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      PinEnroll.prototype.enroll = function (pin) {
        return _super.prototype._enroll.call(this, new Credential(Credential.PIN, pin));
      };
      /** Deletes the PIN enrollment.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      PinEnroll.prototype.unenroll = function () {
        return _super.prototype._unenroll.call(this, new Credential(Credential.PIN));
      };

      return PinEnroll;
    }(Enroller);

    /**
     * Security Questions enrollment API.
     */

    var SecurityQuestionsEnroll =
    /** @class */
    function (_super) {
      __extends(SecurityQuestionsEnroll, _super);
      /** Constructs a new Security Questions enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       */


      function SecurityQuestionsEnroll(context) {
        return _super.call(this, context) || this;
      }
      /**
       * Reads enrolled Security Questions.
       * @returns a promise to return a collection of enrolled Security Questions.
       */


      SecurityQuestionsEnroll.prototype.getEnrolledQuestions = function () {
        return this.context.enrollService.GetEnrollmentData(this.context.getUser(), Credential.SecurityQuestions).then(function (data) {
          return JSON.parse(Utf8.fromBase64Url(data)).map(function (item) {
            return Question.fromJson(item);
          });
        });
      };
      /** Reads a Security Questions enrollment availability.
       * @returns a fulfilled promise when Security Questions can be enrolled, a rejected promise otherwise.
       */


      SecurityQuestionsEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.SecurityQuestions);
      };
      /**
       * Enrolls Security Questions.
       * @param questionsWithAnswers - a colelction of user's answers to Security Questions.
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      SecurityQuestionsEnroll.prototype.enroll = function (questionsWithAnswers) {
        var equal = function (a, b) {
          return a.question.number === b.question.number;
        };

        var unique = function (val, idx, arr) {
          return arr.findIndex(function (qa) {
            return equal(qa, val);
          }) === idx;
        };

        var data = questionsWithAnswers.filter(function (qa) {
          return qa.question.number === qa.answer.number;
        }).filter(unique).sort(function (a, b) {
          return b.question.number - a.question.number;
        }); // server requires reverse order

        return _super.prototype._enroll.call(this, new Credential(Credential.SecurityQuestions, data));
      };
      /** Deletes the Security Question enrollment.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      SecurityQuestionsEnroll.prototype.unenroll = function () {
        return _super.prototype._unenroll.call(this, new Credential(Credential.SecurityQuestions));
      };

      return SecurityQuestionsEnroll;
    }(Enroller);

    function createCommonjsModule(fn, basedir, module) {
    	return module = {
    		path: basedir,
    		exports: {},
    		require: function (path, base) {
    			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    		}
    	}, fn(module, module.exports), module.exports;
    }

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
    }

    //Copyright 2014-2015 Google Inc. All rights reserved.
    //Use of this source code is governed by a BSD-style
    //license that can be found in the LICENSE file or at
    //https://developers.google.com/open-source/licenses/bsd

    /**
     * @fileoverview The U2F api.
     */
    // 'use strict';

    /**
     * Namespace for the U2F api.
     * @type {Object}
     */
    var u2f = u2f || {};
    var chromeApi = u2f; // Adaptation for u2f-api package

    /**
     * FIDO U2F Javascript API Version
     * @number
     */

    var js_api_version;
    /**
     * The U2F extension id
     * @const {string}
     */
    // The Chrome packaged app extension ID.
    // Uncomment this if you want to deploy a server instance that uses
    // the package Chrome app and does not require installing the U2F Chrome extension.

    u2f.EXTENSION_ID = 'kmendfapggjehodndflmmgagdbamhnfd'; // The U2F Chrome extension ID.
    // Uncomment this if you want to deploy a server instance that uses
    // the U2F Chrome extension to authenticate.
    // u2f.EXTENSION_ID = 'pfboblefjcgdjicmnffhdgionmgcdmne';

    /**
     * Message types for messsages to/from the extension
     * @const
     * @enum {string}
     */

    u2f.MessageTypes = {
      'U2F_REGISTER_REQUEST': 'u2f_register_request',
      'U2F_REGISTER_RESPONSE': 'u2f_register_response',
      'U2F_SIGN_REQUEST': 'u2f_sign_request',
      'U2F_SIGN_RESPONSE': 'u2f_sign_response',
      'U2F_GET_API_VERSION_REQUEST': 'u2f_get_api_version_request',
      'U2F_GET_API_VERSION_RESPONSE': 'u2f_get_api_version_response'
    };
    /**
     * Response status codes
     * @const
     * @enum {number}
     */

    u2f.ErrorCodes = {
      'OK': 0,
      'OTHER_ERROR': 1,
      'BAD_REQUEST': 2,
      'CONFIGURATION_UNSUPPORTED': 3,
      'DEVICE_INELIGIBLE': 4,
      'TIMEOUT': 5
    };

    /**
     * Sets up a MessagePort to the U2F extension using the
     * available mechanisms.
     * @param {function((MessagePort|u2f.WrappedChromeRuntimePort_))} callback
     */

    u2f.getMessagePort = function (callback) {
      if (typeof chrome != 'undefined' && chrome.runtime) {
        // The actual message here does not matter, but we need to get a reply
        // for the callback to run. Thus, send an empty signature request
        // in order to get a failure response.
        var msg = {
          type: u2f.MessageTypes.U2F_SIGN_REQUEST,
          signRequests: []
        };
        chrome.runtime.sendMessage(u2f.EXTENSION_ID, msg, function () {
          if (!chrome.runtime.lastError) {
            // We are on a whitelisted origin and can talk directly
            // with the extension.
            u2f.getChromeRuntimePort_(callback);
          } else {
            // chrome.runtime was available, but we couldn't message
            // the extension directly, use iframe
            u2f.getIframePort_(callback);
          }
        });
      } else if (u2f.isAndroidChrome_()) {
        u2f.getAuthenticatorPort_(callback);
      } else if (u2f.isIosChrome_()) {
        u2f.getIosPort_(callback);
      } else {
        // chrome.runtime was not available at all, which is normal
        // when this origin doesn't have access to any extensions.
        u2f.getIframePort_(callback);
      }
    };
    /**
     * Detect chrome running on android based on the browser's useragent.
     * @private
     */


    u2f.isAndroidChrome_ = function () {
      var userAgent = navigator.userAgent;
      return userAgent.indexOf('Chrome') != -1 && userAgent.indexOf('Android') != -1;
    };
    /**
     * Detect chrome running on iOS based on the browser's platform.
     * @private
     */


    u2f.isIosChrome_ = function () {
      return ["iPhone", "iPad", "iPod"].indexOf(navigator.platform) > -1;
    };
    /**
     * Connects directly to the extension via chrome.runtime.connect.
     * @param {function(u2f.WrappedChromeRuntimePort_)} callback
     * @private
     */


    u2f.getChromeRuntimePort_ = function (callback) {
      var port = chrome.runtime.connect(u2f.EXTENSION_ID, {
        'includeTlsChannelId': true
      });
      setTimeout(function () {
        callback(new u2f.WrappedChromeRuntimePort_(port));
      }, 0);
    };
    /**
     * Return a 'port' abstraction to the Authenticator app.
     * @param {function(u2f.WrappedAuthenticatorPort_)} callback
     * @private
     */


    u2f.getAuthenticatorPort_ = function (callback) {
      setTimeout(function () {
        callback(new u2f.WrappedAuthenticatorPort_());
      }, 0);
    };
    /**
     * Return a 'port' abstraction to the iOS client app.
     * @param {function(u2f.WrappedIosPort_)} callback
     * @private
     */


    u2f.getIosPort_ = function (callback) {
      setTimeout(function () {
        callback(new u2f.WrappedIosPort_());
      }, 0);
    };
    /**
     * A wrapper for chrome.runtime.Port that is compatible with MessagePort.
     * @param {Port} port
     * @constructor
     * @private
     */


    u2f.WrappedChromeRuntimePort_ = function (port) {
      this.port_ = port;
    };
    /**
     * Format and return a sign request compliant with the JS API version supported by the extension.
     * @param {Array<u2f.SignRequest>} signRequests
     * @param {number} timeoutSeconds
     * @param {number} reqId
     * @return {Object}
     */


    u2f.formatSignRequest_ = function (appId, challenge, registeredKeys, timeoutSeconds, reqId) {
      if (js_api_version === undefined || js_api_version < 1.1) {
        // Adapt request to the 1.0 JS API
        var signRequests = [];

        for (var i = 0; i < registeredKeys.length; i++) {
          signRequests[i] = {
            version: registeredKeys[i].version,
            challenge: challenge,
            keyHandle: registeredKeys[i].keyHandle,
            appId: appId
          };
        }

        return {
          type: u2f.MessageTypes.U2F_SIGN_REQUEST,
          signRequests: signRequests,
          timeoutSeconds: timeoutSeconds,
          requestId: reqId
        };
      } // JS 1.1 API


      return {
        type: u2f.MessageTypes.U2F_SIGN_REQUEST,
        appId: appId,
        challenge: challenge,
        registeredKeys: registeredKeys,
        timeoutSeconds: timeoutSeconds,
        requestId: reqId
      };
    };
    /**
     * Format and return a register request compliant with the JS API version supported by the extension..
     * @param {Array<u2f.SignRequest>} signRequests
     * @param {Array<u2f.RegisterRequest>} signRequests
     * @param {number} timeoutSeconds
     * @param {number} reqId
     * @return {Object}
     */


    u2f.formatRegisterRequest_ = function (appId, registeredKeys, registerRequests, timeoutSeconds, reqId) {
      if (js_api_version === undefined || js_api_version < 1.1) {
        // Adapt request to the 1.0 JS API
        for (var i = 0; i < registerRequests.length; i++) {
          registerRequests[i].appId = appId;
        }

        var signRequests = [];

        for (var i = 0; i < registeredKeys.length; i++) {
          signRequests[i] = {
            version: registeredKeys[i].version,
            challenge: registerRequests[0],
            keyHandle: registeredKeys[i].keyHandle,
            appId: appId
          };
        }

        return {
          type: u2f.MessageTypes.U2F_REGISTER_REQUEST,
          signRequests: signRequests,
          registerRequests: registerRequests,
          timeoutSeconds: timeoutSeconds,
          requestId: reqId
        };
      } // JS 1.1 API


      return {
        type: u2f.MessageTypes.U2F_REGISTER_REQUEST,
        appId: appId,
        registerRequests: registerRequests,
        registeredKeys: registeredKeys,
        timeoutSeconds: timeoutSeconds,
        requestId: reqId
      };
    };
    /**
     * Posts a message on the underlying channel.
     * @param {Object} message
     */


    u2f.WrappedChromeRuntimePort_.prototype.postMessage = function (message) {
      this.port_.postMessage(message);
    };
    /**
     * Emulates the HTML 5 addEventListener interface. Works only for the
     * onmessage event, which is hooked up to the chrome.runtime.Port.onMessage.
     * @param {string} eventName
     * @param {function({data: Object})} handler
     */


    u2f.WrappedChromeRuntimePort_.prototype.addEventListener = function (eventName, handler) {
      var name = eventName.toLowerCase();

      if (name == 'message' || name == 'onmessage') {
        this.port_.onMessage.addListener(function (message) {
          // Emulate a minimal MessageEvent object
          handler({
            'data': message
          });
        });
      } else {
        console.error('WrappedChromeRuntimePort only supports onMessage');
      }
    };
    /**
     * Wrap the Authenticator app with a MessagePort interface.
     * @constructor
     * @private
     */


    u2f.WrappedAuthenticatorPort_ = function () {
      this.requestId_ = -1;
      this.requestObject_ = null;
    };
    /**
     * Launch the Authenticator intent.
     * @param {Object} message
     */


    u2f.WrappedAuthenticatorPort_.prototype.postMessage = function (message) {
      var intentUrl = u2f.WrappedAuthenticatorPort_.INTENT_URL_BASE_ + ';S.request=' + encodeURIComponent(JSON.stringify(message)) + ';end';
      document.location = intentUrl;
    };
    /**
     * Tells what type of port this is.
     * @return {String} port type
     */


    u2f.WrappedAuthenticatorPort_.prototype.getPortType = function () {
      return "WrappedAuthenticatorPort_";
    };
    /**
     * Emulates the HTML 5 addEventListener interface.
     * @param {string} eventName
     * @param {function({data: Object})} handler
     */


    u2f.WrappedAuthenticatorPort_.prototype.addEventListener = function (eventName, handler) {
      var name = eventName.toLowerCase();

      if (name == 'message') {
        var self = this;
        /* Register a callback to that executes when
         * chrome injects the response. */

        window.addEventListener('message', self.onRequestUpdate_.bind(self, handler), false);
      } else {
        console.error('WrappedAuthenticatorPort only supports message');
      }
    };
    /**
     * Callback invoked  when a response is received from the Authenticator.
     * @param function({data: Object}) callback
     * @param {Object} message message Object
     */


    u2f.WrappedAuthenticatorPort_.prototype.onRequestUpdate_ = function (callback, message) {
      var messageObject = JSON.parse(message.data);
      var intentUrl = messageObject['intentURL'];
      var errorCode = messageObject['errorCode'];
      var responseObject = null;

      if (messageObject.hasOwnProperty('data')) {
        responseObject =
        /** @type {Object} */
        JSON.parse(messageObject['data']);
      }

      callback({
        'data': responseObject
      });
    };
    /**
     * Base URL for intents to Authenticator.
     * @const
     * @private
     */


    u2f.WrappedAuthenticatorPort_.INTENT_URL_BASE_ = 'intent:#Intent;action=com.google.android.apps.authenticator.AUTHENTICATE';
    /**
     * Wrap the iOS client app with a MessagePort interface.
     * @constructor
     * @private
     */

    u2f.WrappedIosPort_ = function () {};
    /**
     * Launch the iOS client app request
     * @param {Object} message
     */


    u2f.WrappedIosPort_.prototype.postMessage = function (message) {
      var str = JSON.stringify(message);
      var url = "u2f://auth?" + encodeURI(str);
      location.replace(url);
    };
    /**
     * Tells what type of port this is.
     * @return {String} port type
     */


    u2f.WrappedIosPort_.prototype.getPortType = function () {
      return "WrappedIosPort_";
    };
    /**
     * Emulates the HTML 5 addEventListener interface.
     * @param {string} eventName
     * @param {function({data: Object})} handler
     */


    u2f.WrappedIosPort_.prototype.addEventListener = function (eventName, handler) {
      var name = eventName.toLowerCase();

      if (name !== 'message') {
        console.error('WrappedIosPort only supports message');
      }
    };
    /**
     * Sets up an embedded trampoline iframe, sourced from the extension.
     * @param {function(MessagePort)} callback
     * @private
     */


    u2f.getIframePort_ = function (callback) {
      // Create the iframe
      var iframeOrigin = 'chrome-extension://' + u2f.EXTENSION_ID;
      var iframe = document.createElement('iframe');
      iframe.src = iframeOrigin + '/u2f-comms.html';
      iframe.setAttribute('style', 'display:none');
      document.body.appendChild(iframe);
      var channel = new MessageChannel();

      var ready = function (message) {
        if (message.data == 'ready') {
          channel.port1.removeEventListener('message', ready);
          callback(channel.port1);
        } else {
          console.error('First event on iframe port was not "ready"');
        }
      };

      channel.port1.addEventListener('message', ready);
      channel.port1.start();
      iframe.addEventListener('load', function () {
        // Deliver the port to the iframe and initialize
        iframe.contentWindow.postMessage('init', iframeOrigin, [channel.port2]);
      });
    }; //High-level JS API

    /**
     * Default extension response timeout in seconds.
     * @const
     */


    u2f.EXTENSION_TIMEOUT_SEC = 30;
    /**
     * A singleton instance for a MessagePort to the extension.
     * @type {MessagePort|u2f.WrappedChromeRuntimePort_}
     * @private
     */

    u2f.port_ = null;
    /**
     * Callbacks waiting for a port
     * @type {Array<function((MessagePort|u2f.WrappedChromeRuntimePort_))>}
     * @private
     */

    u2f.waitingForPort_ = [];
    /**
     * A counter for requestIds.
     * @type {number}
     * @private
     */

    u2f.reqCounter_ = 0;
    /**
     * A map from requestIds to client callbacks
     * @type {Object.<number,(function((u2f.Error|u2f.RegisterResponse))
     *                       |function((u2f.Error|u2f.SignResponse)))>}
     * @private
     */

    u2f.callbackMap_ = {};
    /**
     * Creates or retrieves the MessagePort singleton to use.
     * @param {function((MessagePort|u2f.WrappedChromeRuntimePort_))} callback
     * @private
     */

    u2f.getPortSingleton_ = function (callback) {
      if (u2f.port_) {
        callback(u2f.port_);
      } else {
        if (u2f.waitingForPort_.length == 0) {
          u2f.getMessagePort(function (port) {
            u2f.port_ = port;
            u2f.port_.addEventListener('message',
            /** @type {function(Event)} */
            u2f.responseHandler_); // Careful, here be async callbacks. Maybe.

            while (u2f.waitingForPort_.length) u2f.waitingForPort_.shift()(u2f.port_);
          });
        }

        u2f.waitingForPort_.push(callback);
      }
    };
    /**
     * Handles response messages from the extension.
     * @param {MessageEvent.<u2f.Response>} message
     * @private
     */


    u2f.responseHandler_ = function (message) {
      var response = message.data;
      var reqId = response['requestId'];

      if (!reqId || !u2f.callbackMap_[reqId]) {
        console.error('Unknown or missing requestId in response.');
        return;
      }

      var cb = u2f.callbackMap_[reqId];
      delete u2f.callbackMap_[reqId];
      cb(response['responseData']);
    };
    /**
     * Calls the callback with true or false as first and only argument
     * @param {Function} callback
     */


    u2f.isSupported = function (callback) {
      var hasCalledBack = false;

      function reply(value) {
        if (hasCalledBack) return;
        hasCalledBack = true;
        callback(value);
      }

      u2f.getApiVersion(function (response) {
        js_api_version = response['js_api_version'] === undefined ? 0 : response['js_api_version'];
        reply(true);
      }); // No response from extension within 1500ms -> no support

      setTimeout(reply.bind(null, false), 1500);
    };
    /**
     * Dispatches an array of sign requests to available U2F tokens.
     * If the JS API version supported by the extension is unknown, it first sends a
     * message to the extension to find out the supported API version and then it sends
     * the sign request.
     * @param {string=} appId
     * @param {string=} challenge
     * @param {Array<u2f.RegisteredKey>} registeredKeys
     * @param {function((u2f.Error|u2f.SignResponse))} callback
     * @param {number=} opt_timeoutSeconds
     */


    u2f.sign = function (appId, challenge, registeredKeys, callback, opt_timeoutSeconds) {
      if (js_api_version === undefined) {
        // Send a message to get the extension to JS API version, then send the actual sign request.
        u2f.getApiVersion(function (response) {
          js_api_version = response['js_api_version'] === undefined ? 0 : response['js_api_version'];
          console.log("Extension JS API Version: ", js_api_version);
          u2f.sendSignRequest(appId, challenge, registeredKeys, callback, opt_timeoutSeconds);
        });
      } else {
        // We know the JS API version. Send the actual sign request in the supported API version.
        u2f.sendSignRequest(appId, challenge, registeredKeys, callback, opt_timeoutSeconds);
      }
    };
    /**
     * Dispatches an array of sign requests to available U2F tokens.
     * @param {string=} appId
     * @param {string=} challenge
     * @param {Array<u2f.RegisteredKey>} registeredKeys
     * @param {function((u2f.Error|u2f.SignResponse))} callback
     * @param {number=} opt_timeoutSeconds
     */


    u2f.sendSignRequest = function (appId, challenge, registeredKeys, callback, opt_timeoutSeconds) {
      u2f.getPortSingleton_(function (port) {
        var reqId = ++u2f.reqCounter_;
        u2f.callbackMap_[reqId] = callback;
        var timeoutSeconds = typeof opt_timeoutSeconds !== 'undefined' ? opt_timeoutSeconds : u2f.EXTENSION_TIMEOUT_SEC;
        var req = u2f.formatSignRequest_(appId, challenge, registeredKeys, timeoutSeconds, reqId);
        port.postMessage(req);
      });
    };
    /**
     * Dispatches register requests to available U2F tokens. An array of sign
     * requests identifies already registered tokens.
     * If the JS API version supported by the extension is unknown, it first sends a
     * message to the extension to find out the supported API version and then it sends
     * the register request.
     * @param {string=} appId
     * @param {Array<u2f.RegisterRequest>} registerRequests
     * @param {Array<u2f.RegisteredKey>} registeredKeys
     * @param {function((u2f.Error|u2f.RegisterResponse))} callback
     * @param {number=} opt_timeoutSeconds
     */


    u2f.register = function (appId, registerRequests, registeredKeys, callback, opt_timeoutSeconds) {
      if (js_api_version === undefined) {
        // Send a message to get the extension to JS API version, then send the actual register request.
        u2f.getApiVersion(function (response) {
          js_api_version = response['js_api_version'] === undefined ? 0 : response['js_api_version'];
          console.log("Extension JS API Version: ", js_api_version);
          u2f.sendRegisterRequest(appId, registerRequests, registeredKeys, callback, opt_timeoutSeconds);
        });
      } else {
        // We know the JS API version. Send the actual register request in the supported API version.
        u2f.sendRegisterRequest(appId, registerRequests, registeredKeys, callback, opt_timeoutSeconds);
      }
    };
    /**
     * Dispatches register requests to available U2F tokens. An array of sign
     * requests identifies already registered tokens.
     * @param {string=} appId
     * @param {Array<u2f.RegisterRequest>} registerRequests
     * @param {Array<u2f.RegisteredKey>} registeredKeys
     * @param {function((u2f.Error|u2f.RegisterResponse))} callback
     * @param {number=} opt_timeoutSeconds
     */


    u2f.sendRegisterRequest = function (appId, registerRequests, registeredKeys, callback, opt_timeoutSeconds) {
      u2f.getPortSingleton_(function (port) {
        var reqId = ++u2f.reqCounter_;
        u2f.callbackMap_[reqId] = callback;
        var timeoutSeconds = typeof opt_timeoutSeconds !== 'undefined' ? opt_timeoutSeconds : u2f.EXTENSION_TIMEOUT_SEC;
        var req = u2f.formatRegisterRequest_(appId, registeredKeys, registerRequests, timeoutSeconds, reqId);
        port.postMessage(req);
      });
    };
    /**
     * Dispatches a message to the extension to find out the supported
     * JS API version.
     * If the user is on a mobile phone and is thus using Google Authenticator instead
     * of the Chrome extension, don't send the request and simply return 0.
     * @param {function((u2f.Error|u2f.GetJsApiVersionResponse))} callback
     * @param {number=} opt_timeoutSeconds
     */


    u2f.getApiVersion = function (callback, opt_timeoutSeconds) {
      u2f.getPortSingleton_(function (port) {
        // If we are using Android Google Authenticator or iOS client app,
        // do not fire an intent to ask which JS API version to use.
        if (port.getPortType) {
          var apiVersion;

          switch (port.getPortType()) {
            case 'WrappedIosPort_':
            case 'WrappedAuthenticatorPort_':
              apiVersion = 1.1;
              break;

            default:
              apiVersion = 0;
              break;
          }

          callback({
            'js_api_version': apiVersion
          });
          return;
        }

        var reqId = ++u2f.reqCounter_;
        u2f.callbackMap_[reqId] = callback;
        var req = {
          type: u2f.MessageTypes.U2F_GET_API_VERSION_REQUEST,
          timeoutSeconds: typeof opt_timeoutSeconds !== 'undefined' ? opt_timeoutSeconds : u2f.EXTENSION_TIMEOUT_SEC,
          requestId: reqId
        };
        port.postMessage(req);
      });
    };

    var generatedGoogleU2fApi = {
      chromeApi: chromeApi
    };

    var u2fApi = createCommonjsModule(function (module, exports) {

      Object.defineProperty(exports, "__esModule", {
        value: true
      }); // @ts-ignore
      // Feature detection (yes really)
      // For IE and Edge detection, see https://stackoverflow.com/questions/31757852#31757969
      // and https://stackoverflow.com/questions/56360225#56361977

      var isBrowser = typeof navigator !== 'undefined' && !!navigator.userAgent;
      var isSafari = isBrowser && navigator.userAgent.match(/Safari\//) && !navigator.userAgent.match(/Chrome\//);
      var isEDGE = isBrowser && /(Edge\/)|(edg\/)/i.test(navigator.userAgent);
      var isIE = isBrowser && /(MSIE 9|MSIE 10|rv:11.0)/i.test(navigator.userAgent);
      var _backend = null;

      function getBackend() {
        if (_backend) return _backend;
        var supportChecker = new Promise(function (resolve, reject) {
          function notSupported() {
            resolve({
              u2f: null
            });
          }

          if (!isBrowser) return notSupported();
          if (isSafari) // Safari doesn't support U2F, and the Safari-FIDO-U2F
            // extension lacks full support (Multi-facet apps), so we
            // block it until proper support.
            return notSupported();
          var hasNativeSupport = typeof window.u2f !== 'undefined' && typeof window.u2f.sign === 'function';
          if (hasNativeSupport) return resolve({
            u2f: window.u2f
          });
          if (isEDGE || isIE) // We don't want to check for Google's extension hack on EDGE & IE
            // as it'll cause trouble (popups, etc)
            return notSupported();
          if (location.protocol === 'http:') // U2F isn't supported over http, only https
            return notSupported();
          if (typeof MessageChannel === 'undefined') // Unsupported browser, the chrome hack would throw
            return notSupported(); // Test for google extension support

          generatedGoogleU2fApi.chromeApi.isSupported(function (ok) {
            if (ok) resolve({
              u2f: generatedGoogleU2fApi.chromeApi
            });else notSupported();
          });
        }).then(function (response) {
          _backend = response.u2f ? supportChecker : null;
          return response;
        });
        return supportChecker;
      }

      exports.ErrorCodes = {
        OK: 0,
        OTHER_ERROR: 1,
        BAD_REQUEST: 2,
        CONFIGURATION_UNSUPPORTED: 3,
        DEVICE_INELIGIBLE: 4,
        TIMEOUT: 5
      };
      exports.ErrorNames = {
        "0": "OK",
        "1": "OTHER_ERROR",
        "2": "BAD_REQUEST",
        "3": "CONFIGURATION_UNSUPPORTED",
        "4": "DEVICE_INELIGIBLE",
        "5": "TIMEOUT"
      };

      function makeError(msg, err) {
        var code = err != null ? err.errorCode : 1; // Default to OTHER_ERROR

        var type = exports.ErrorNames['' + code];
        var error = new Error(msg);
        error.metaData = {
          type: type,
          code: code
        };
        return error;
      }

      function isSupported() {
        return getBackend().then(function (backend) {
          return !!backend.u2f;
        });
      }

      exports.isSupported = isSupported;

      function _ensureSupport(backend) {
        if (!backend.u2f) {
          if (location.protocol === 'http:') throw new Error("U2F isn't supported over http, only https");
          throw new Error("U2F not supported");
        }
      }

      function ensureSupport() {
        return getBackend().then(_ensureSupport);
      }

      exports.ensureSupport = ensureSupport;

      function arrayify(value) {
        if (value != null && Array.isArray(value)) return value;
        return value == null ? [] : Array.isArray(value) ? value.slice() : [value];
      }

      function register(registerRequests, signRequests, timeout) {
        var _registerRequests = arrayify(registerRequests);

        if (typeof signRequests === 'number' && typeof timeout === 'undefined') {
          timeout = signRequests;
          signRequests = [];
        }

        var _signRequests = arrayify(signRequests);

        return getBackend().then(function (backend) {
          _ensureSupport(backend);

          var u2f = backend.u2f;
          return new Promise(function (resolve, reject) {
            function callback(response) {
              if (response.errorCode) reject(makeError("Registration failed", response));else {
                delete response.errorCode;
                resolve(response);
              }
            }

            var appId = _registerRequests[0].appId;
            u2f.register(appId, _registerRequests, _signRequests, callback, timeout);
          });
        });
      }

      exports.register = register;

      function sign(signRequests, timeout) {
        var _signRequests = arrayify(signRequests);

        return getBackend().then(function (backend) {
          _ensureSupport(backend);

          var u2f = backend.u2f;
          return new Promise(function (resolve, reject) {
            var _a;

            function callback(response) {
              if (response.errorCode) reject(makeError("Sign failed", response));else {
                delete response.errorCode;
                resolve(response);
              }
            }

            var appId = _signRequests[0].appId;
            var challenge = _signRequests[0].challenge;

            var registeredKeys = (_a = []).concat.apply(_a, _signRequests.map(function (_a) {
              var version = _a.version,
                  keyHandle = _a.keyHandle,
                  appId = _a.appId;
              return arrayify(keyHandle).map(function (keyHandle) {
                return {
                  version: version,
                  keyHandle: keyHandle,
                  appId: appId
                };
              });
            }));

            u2f.sign(appId, challenge, registeredKeys, callback, timeout);
          });
        });
      }

      exports.sign = sign;
    });

    var dist = createCommonjsModule(function (module, exports) {

      function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
      }

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      __export(u2fApi);

      exports.default = u2fApi;
    });

    /**
     * Universal Second Factor (U2F) enrollment API.
     */

    var U2FEnroll =
    /** @class */
    function (_super) {
      __extends(U2FEnroll, _super);
      /** Constructs a new U2F enrollment API object.
       * @param context - an {@link EnrollmentContext|enrollment context}.
       * @param appId - an AppID of the service.
       */


      function U2FEnroll(context, appId) {
        var _this = _super.call(this, context) || this;

        if (!appId) throw new Error("appId");
        _this.appId = appId;
        return _this;
      }
      /** Reads a U2F enrollment availability.
       * @returns a fulfilled promise when a U2F can be enrolled, a rejected promise otherwise.
       */


      U2FEnroll.prototype.canEnroll = function () {
        return _super.prototype._canEnroll.call(this, Credential.U2F);
      };
      /**
       * Enrolls a U2F token.
       * @returns a promise to perform the enrollment or reject in case of an error.
       */


      U2FEnroll.prototype.enroll = function () {
        var _this = this;

        var version = "U2F_V2";
        var appId = this.appId;
        var timestamp = Math.round(new Date().getTime() / (U2FEnroll.TIME_WINDOW * 1000));
        var challenge = Base64Url.fromUtf16(timestamp.toString());
        var registerRequests = [{
          version: version,
          appId: appId,
          challenge: challenge
        }];
        return dist.register(registerRequests, [], U2FEnroll.TIMEOUT).then(function (response) {
          return _super.prototype._enroll.call(_this, new Credential(Credential.U2F, __assign({
            version: version,
            appId: appId
          }, response)));
        });
      };
      /** Deletes the U2F enrollment.
       * @returns a promise to delete the enrollment or reject in case of an error.
       */


      U2FEnroll.prototype.unenroll = function () {
        return _super.prototype._unenroll.call(this, new Credential(Credential.U2F));
      };

      U2FEnroll.TIMEOUT = 20;
      U2FEnroll.TIME_WINDOW = 30;
      return U2FEnroll;
    }(Enroller);

    /* Digitalpersona Devices API */

    class reader {
      constructor(options = undefined) {
        try {
          console.log(`Initializing reader`);
          if (!options) console.log('Missing options. Using default WebSdk options');
          this.deviceReady = false;
          this.webSdkOptions = options;
          this.reader = new devices.FingerprintReader(this.webSdkOptions);
          this.reader.on("DeviceConnected", this.onDeviceConnected);
          this.reader.on("SamplesAcquired", this.onSamplesAcquired);
          this.reader.on("AcquisitionStarted", this.onAcquisitionStarted);
          this.reader.on("AcquisitionStopped", this.onAcquisitionStopped);
          this.reader.on("QualityReported", this.onQualityReported);
          this.reader.on("ErrorOccurred", this.onReaderError);
          this.reader.on("ConnectionFailed", this.onConnectionError);
          this.reader.on("DeviceDisconnected", this.onDeviceDisconnected);
          console.log(`Device initialization complete`);
        } catch (error) {
          this.handleError(error);
        }
      }

      onDeviceConnected(event) {
        this.deviceReady = true;
        console.log('Device is connected');
      }

      onDeviceDisconnected(event) {
        console.log('Device is disconnected');
      }

      onQualityReported(event) {
        console.log('Showing quality report');
      }

      onConnectionError(event) {
        this.handleError(event, 'Connection Error');
      }

      onReaderError(event) {
        this.handleError(event);
      }
      /**
       * When fingerprint acquisition mode is activated successfully*/


      async onAcquisitionStarted(event) {
        /*Waiting for a finger*/
        console.log('Fingerprint reading activated successfully', event);
      }
      /*On successful scan*/


      async onSamplesAcquired(event) {
        console.log('Fingerprint sample acquired');
        this.samples = event.samples;
        this.notifyOnToken(this.samples);
      }
      /*When fingerprint acquisition mode is deactivated*/


      async onAcquisitionStopped(event) {
        console.log('Fingerprint reading stopped', event);
      }

      notifyOnToken(token) {
        console.log({
          token
        });
      }

      async submitFingerprints(context, samples, pos) {
        try {
          const api = new FingerprintsEnroll(context);
          await api.enroll(pos, samples);
        } catch (error) {
          this.handleError(error);
        }
      }

      handleError(error, title = '  ') {
        console.error(title ?? title, error);
      }

      async startReading() {
        try {
          if (!this.deviceReady) throw new Error('Device is not Loaded');
          /*Set fingerprint activation mode to true*/

          await this.reader.startAcquisition(devices.SampleFormat.Intermediate);
        } catch (err) {
          this.handleError(err);
        }
      }

      async stopReading() {
        try {
          await this.reader.stopAcquisition();
        } catch (err) {
          this.handleError(err);
        }
      }

      destroy() {
        this.reader.off();
        delete this.reader;
      }

    }

    return reader;

})));
//# sourceMappingURL=bundle.js.map
