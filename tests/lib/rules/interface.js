'use strict';

const { RuleTester } = require('eslint');

const rule = require('../../../lib/rules/interface');

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('interface', rule, {
  valid: [
    // default (asc)
    { code: 'interface U {_:T; a:T; b:T;} // default (asc)' },
    { code: 'interface U {a:T; b:T; c:T;}' },
    { code: 'interface U {a:T; b:T; b_:T;}' },
    { code: 'interface U {C:T; b_:T; c:T;}' },
    { code: 'interface U {$:T; A:T; _:T; a:T;}' },
    { code: "interface U {1:T; '11':T; 2:T; A:T;}" },
    { code: "interface U {'#':T; 'Z':T; À:T; è:T;}" },

    { code: 'interface U {a:T; ["ab"]:T; b:T; c:T;}' },

    // nested
    { code: 'interface U {a:T; b:{x:T; y:T;}; c:T;} // nested' },
    { code: 'interface U {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}' },
    { code: 'type U = {a:T; b:{x:T; y:T;}; c:T;}' },
    { code: 'type U = {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}' },

    // asc
    { code: 'interface U {_:T; a:T; b:T;} // asc', options: ['asc'] },
    { code: 'interface U {a:T; b:T; c:T;}', options: ['asc'] },
    { code: 'interface U {a:T; b:T; b_:T;}', options: ['asc'] },
    { code: 'interface U {C:T; b_:T; c:T;}', options: ['asc'] },
    { code: 'interface U {$:T; A:T; _:T; a:T;}', options: ['asc'] },
    { code: "interface U {1:T; '11':T; 2:T; A:T;}", options: ['asc'] },
    { code: "interface U {'#':T; 'Z':T; À:T; è:T;}", options: ['asc'] },

    // asc, insensitive
    { code: 'interface U {_:T; a:T; b:T;} // asc, insensitive', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {a:T; b:T; c:T;}', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {a:T; b:T; b_:T;}', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {b_:T; C:T; c:T;}', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {b_:T; c:T; C:T;}', options: ['asc', { caseSensitive: false }] },
    { code: 'interface U {$:T; _:T; A:T; a:T;}', options: ['asc', { caseSensitive: false }] },
    { code: "interface U {1:T; '11':T; 2:T; A:T;}", options: ['asc', { caseSensitive: false }] },
    { code: "interface U {'#':T; 'Z':T; À:T; è:T;}", options: ['asc', { natural: true }] },

    // asc, natural, insensitive
    { code: 'interface U {_:T; a:T; b:T;} // asc, natural, insensitive', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {a:T; b:T; c:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {a:T; b:T; b_:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {b_:T; C:T; c:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {b_:T; c:T; C:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {$:T; _:T; A:T; a:T;}', options: ['asc', { natural: true, caseSensitive: false }] },
    { code: "interface U {1:T; 2:T; '11':T; A:T;}", options: ['asc', { natural: true, caseSensitive: false }] },
    { code: "interface U {'#':T; 'Z':T; À:T; è:T;}", options: ['asc', { natural: true, caseSensitive: false }] },

    // desc
    { code: 'interface U {b:T; a:T; _:T;} // desc', options: ['desc'] },
    { code: 'interface U {c:T; b:T; a:T;}', options: ['desc'] },
    { code: 'interface U {b_:T; b:T; a:T;}', options: ['desc'] },
    { code: 'interface U {c:T; b_:T; C:T;}', options: ['desc'] },
    { code: 'interface U {a:T; _:T; A:T; $:T;}', options: ['desc'] },
    { code: "interface U {A:T; 2:T; '11':T; 1:T;}", options: ['desc'] },
    { code: "interface U {è:T; À:T; 'Z':T; '#':T;}", options: ['desc'] },

    // desc, insensitive
    { code: 'interface U {b:T; a:T; _:T;} // desc, insensitive', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {c:T; b:T; a:T;}', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {b_:T; b:T; a:T;}', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {c:T; C:T; b_:T;}', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {C:T; c:T; b_:T;}', options: ['desc', { caseSensitive: false }] },
    { code: 'interface U {a:T; A:T; _:T; $:T;}', options: ['desc', { caseSensitive: false }] },
    { code: "interface U {A:T; 2:T; '11':T; 1:T;}", options: ['desc', { caseSensitive: false }] },
    { code: "interface U {è:T; À:T; 'Z':T; '#':T;}", options: ['desc', { caseSensitive: false }] },

    // desc, natural
    { code: 'interface U {b:T; a:T; _:T;} // desc, natural', options: ['desc', { natural: true }] },
    { code: 'interface U {c:T; b:T; a:T;}', options: ['desc', { natural: true }] },
    { code: 'interface U {b_:T; b:T; a:T;}', options: ['desc', { natural: true }] },
    { code: 'interface U {c:T; b_:T; C:T;}', options: ['desc', { natural: true }] },
    { code: 'interface U {a:T; A:T; _:T; $:T;}', options: ['desc', { natural: true }] },
    { code: "interface U {A:T; '11':T; 2:T; 1:T;}", options: ['desc', { natural: true }] },
    { code: "interface U {è:T; À:T; 'Z':T; '#':T;}", options: ['desc', { natural: true }] },

    // desc, natural, insensitive
    { code: 'interface U {b:T; a:T; _:T;} // desc, natural, insensitive', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {c:T; b:T; a:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {b_:T; b:T; a:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {c:T; C:T; b_:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {C:T; c:T; b_:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: 'interface U {a:T; A:T; _:T; $:T;}', options: ['desc', { natural: true, caseSensitive: false }] },
    { code: "interface U {A:T; '11':T; 2:T; 1:T;}", options: ['desc', { natural: true, caseSensitive: false }] },
    { code: "interface U {è:T; À:T; 'Z':T; '#':T;}", options: ['desc', { natural: true, caseSensitive: false }] },
  ],

  invalid: [
    // default (asc)
    {
      code: 'interface U {a:T; _:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. '_' should be before 'a'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'b' should be before 'c'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b_'."],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      errors: ["Expected interface keys to be in ascending order. 'C' should be before 'c'."],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      errors: ["Expected interface keys to be in ascending order. 'A' should be before '_'."],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
    },

    // methods
    {
      code: "interface U {1:T; 2:T; A():T; '11':T;}",
      errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
    },
    {
      code: "interface U {'#'():T; À():T; 'Z':T; è:T;}",
      errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
    },

    // not ignore simple computed properties.
    {
      code: 'interface U {a:T; b:T; ["a"]:T; c:T;}',
      errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b'."],
    },

    // nested
    {
      code: 'interface U {a:T; c:{y:T; x:T;}, b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'x' should be before 'y'.", "Expected interface keys to be in ascending order. 'b' should be before 'c'."],
    },
    {
      code: 'type U = {a:T; c:{y:T; x:T;}, b:T;}',
      errors: ["Expected interface keys to be in ascending order. 'x' should be before 'y'.", "Expected interface keys to be in ascending order. 'b' should be before 'c'."],
    },

    // asc
    {
      code: 'interface U {a:T; _:T; b:T;} // asc',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. '_' should be before 'a'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'b' should be before 'c'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'a' should be before 'b_'."],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'C' should be before 'c'."],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'A' should be before '_'."],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. '11' should be before 'A'."],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['asc'],
      errors: ["Expected interface keys to be in ascending order. 'Z' should be before 'À'."],
    },

    // asc, insensitive
    {
      code: 'interface U {a:T; _:T; b:T;} // asc, insensitive',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. '_' should be before 'a'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. 'b' should be before 'c'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. 'a' should be before 'b_'."],
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. '_' should be before 'A'."],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. '11' should be before 'A'."],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['asc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive ascending order. 'Z' should be before 'À'."],
    },

    // asc, natural
    {
      code: 'interface U {a:T; _:T; b:T;} // asc, natural',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. '_' should be before 'a'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. 'b' should be before 'c'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. 'a' should be before 'b_'."],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. 'C' should be before 'c'."],
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. '_' should be before 'A'."],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. '11' should be before 'A'."],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['asc', { natural: true }],
      errors: ["Expected interface keys to be in natural ascending order. 'Z' should be before 'À'."],
    },

    // asc, natural, insensitive
    {
      code: 'interface U {a:T; _:T; b:T;} // asc, natural, insensitive',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. '_' should be before 'a'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. 'b' should be before 'c'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. 'a' should be before 'b_'."],
    },
    {
      code: 'interface U {$:T; A:T; _:T; a:T;}',
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. '_' should be before 'A'."],
    },
    {
      code: "interface U {1:T; '11':T; 2:T; A:T;}",
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. '2' should be before '11'."],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['asc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive ascending order. 'Z' should be before 'À'."],
    },

    // desc
    {
      code: 'interface U {a:T; _:T; b:T;} // desc',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'b' should be before '_'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'c' should be before 'a'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'b' should be before 'a'."],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'c' should be before 'b_'."],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. '_' should be before '$'.", "Expected interface keys to be in descending order. 'a' should be before 'A'."],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. '2' should be before '1'.", "Expected interface keys to be in descending order. 'A' should be before '2'."],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['desc'],
      errors: ["Expected interface keys to be in descending order. 'À' should be before '#'.", "Expected interface keys to be in descending order. 'è' should be before 'Z'."],
    },

    // desc, insensitive
    {
      code: 'interface U {a:T; _:T; b:T;} // desc, insensitive',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'b' should be before '_'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'c' should be before 'a'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'b' should be before 'a'."],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'c' should be before 'b_'."],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. '_' should be before '$'.", "Expected interface keys to be in insensitive descending order. 'A' should be before '_'."],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. '2' should be before '1'.", "Expected interface keys to be in insensitive descending order. 'A' should be before '2'."],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['desc', { caseSensitive: false }],
      errors: ["Expected interface keys to be in insensitive descending order. 'À' should be before '#'.", "Expected interface keys to be in insensitive descending order. 'è' should be before 'Z'."],
    },

    // desc, natural
    {
      code: 'interface U {a:T; _:T; b:T;} // desc, natural',
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'b' should be before '_'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'c' should be before 'a'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'b' should be before 'a'."],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'c' should be before 'b_'."],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['desc', { natural: true }],
      errors: [
        "Expected interface keys to be in natural descending order. '_' should be before '$'.",
        "Expected interface keys to be in natural descending order. 'A' should be before '_'.",
        "Expected interface keys to be in natural descending order. 'a' should be before 'A'.",
      ],
    },
    {
      code: "interface U {1:T; 2:T; A:T; '11':T;}",
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. '2' should be before '1'.", "Expected interface keys to be in natural descending order. 'A' should be before '2'."],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['desc', { natural: true }],
      errors: ["Expected interface keys to be in natural descending order. 'À' should be before '#'.", "Expected interface keys to be in natural descending order. 'è' should be before 'Z'."],
    },

    // desc, natural, insensitive
    {
      code: 'interface U {a:T; _:T; b:T;} // desc, natural, insensitive',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive descending order. 'b' should be before '_'."],
    },
    {
      code: 'interface U {a:T; c:T; b:T;}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive descending order. 'c' should be before 'a'."],
    },
    {
      code: 'interface U {b_:T; a:T; b:T;}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive descending order. 'b' should be before 'a'."],
    },
    {
      code: 'interface U {b_:T; c:T; C:T;}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: ["Expected interface keys to be in natural insensitive descending order. 'c' should be before 'b_'."],
    },
    {
      code: 'interface U {$:T; _:T; A:T; a:T;}',
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: [
        "Expected interface keys to be in natural insensitive descending order. '_' should be before '$'.",
        "Expected interface keys to be in natural insensitive descending order. 'A' should be before '_'.",
      ],
    },
    {
      code: "interface U {1:T; 2:T; '11':T; A:T;}",
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: [
        "Expected interface keys to be in natural insensitive descending order. '2' should be before '1'.",
        "Expected interface keys to be in natural insensitive descending order. '11' should be before '2'.",
        "Expected interface keys to be in natural insensitive descending order. 'A' should be before '11'.",
      ],
    },
    {
      code: "interface U {'#':T; À:T; 'Z':T; è:T;}",
      options: ['desc', { natural: true, caseSensitive: false }],
      errors: [
        "Expected interface keys to be in natural insensitive descending order. 'À' should be before '#'.",
        "Expected interface keys to be in natural insensitive descending order. 'è' should be before 'Z'.",
      ],
    },
  ],
});
