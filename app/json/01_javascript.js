import {wrapSnippit} from './helpers';

/* HTML markup for beginning and end of code snippets */

/***********************************
* Challenge Seed Templates
***********************************

{
	title: ``,
	subtitle: ``,
	choices: [
		``,
		``,
		``,
		``
	],
	solution: ``,
	explanation: ``
},

*/

/***********************************
 * Export Challenge Array
 *********************************** */

export const javascriptJson = {
  title: 'JavaScript Quiz',
  category: 'JavaScript',
  challenges: [
    {
      title: 'Which of the following statements is true of JavaScript?',
      subtitle: 'JavaScript Programming Styles',
      choices: [
        {
          id: 'choice_0',
          choice: 'JavaScript supports object-oriented programming',
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice: 'JavaScript supports functional programming',
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice: 'JavaScript supports imperative programming',
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice: 'All of these choices are correct',
          isSelected: false,
        },
      ],
      solution: '3',
      explanation:
        '\n        As a prototype-based language, with first-class functions, JavaScript is a mult-paradigm\n        language which supports object-oriented, imperative, and functional programming styles.',
      selectedChoice: null,
    },
    {
      title:
        "What will the following code log to the console? <pre><code class='language-javascript'>\nconsole.log(false == 0);\nconsole.log(false === 0);\n      </code></pre>",
      subtitle: 'Equality in JavaScript 2',
      choices: [
        {
          id: 'choice_0',
          choice:
            "<pre><code class='language-javascript'>true\ntrue</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            "<pre><code class='language-javascript'>true\nfalse</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            "<pre><code class='language-javascript'>false\ntrue</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice:
            "<pre><code class='language-javascript'>false\nfalse</code></pre>",
          isSelected: false,
        },
      ],
      solution: '1',
      explanation:
        "\n        The first expression will evaluate to <code>true</code> since the <code>==</code> operator\n        performs a non-strict comparison, meaning that if the 2 values are not of the same type,\n        JavaScript will attempt to coerce the values into comparable types. In this case, JavaScript\n        will coerce <code>0</code> into to a boolean, and since <code>0</code> is falsy in JavaScript,\n        it will coerce to <code>false</code>.<br /><br />\n\n        The <code>===</code> operator, on the other hand, represents strict equality, meaning that\n        no type coercion will take place. To evaluate to <code>true</code>, the values on either side\n        of this symbol must be of the same type and value. This means that the second expression evaluates\n        to <code>false</code> &mdash; since <code>false</code> and <code>0</code> are not of the same type,\n        no further comparison is necessary.<br /><br />\n\n        Note that these principles hold true for JavaScript's inequality operators as well, non-strict:\n        <code>!=</code>, strict: <code>!==</code>.",
      selectedChoice: null,
    },
    {
      title:
        "Which of the following choices will empty the array <code>foo</code> as well\n              as all references to <code>foo</code> (such as <code>bar</code>)? <pre><code class='language-javascript'>\nvar foo =  [1, 2, 3, 4, 5, 6, 7];\nvar bar = foo;\n      </code></pre>",
      subtitle: 'Emptying an array',
      choices: [
        {
          id: 'choice_0',
          choice:
            "<pre><code class='language-javascript'>foo.splice(0, foo.length);</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            "<pre><code class='language-javascript'>foo.slice(0, foo.length);</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            "<pre><code class='language-javascript'>foo = [];</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice:
            "<pre><code class='language-javascript'>foo.empty();</code></pre>",
          isSelected: false,
        },
      ],
      solution: '0',
      explanation:
        "\n        JavaScript's native <code>splice</code> method modifies a referenced array in place by removing\n        and (optionally) adding elements. <code>splice</code>'s first parameter indicates the index at\n        which to begin removing elements, the second indicates how many elements to remove, while the\n        third can be any number of elements to add to the array in their place. So by invoking <code>\n        splice</code> with <code>0</code> and <code>Array.length</code>, and by omitting the 3rd,\n        parameter we can reliably empty an array of any length. Another method of emptying an array\n        that works just as well, is to explicitly set the length of the array to <code>0</code>, i.e.\n        <code>foo.length = 0;</code>.<br /><br />\n\n        The <code>foo = [];</code> method would not truly empty the array. Instead, it would have only\n        reassigned the variable <code>foo</code> to a new array object. The original array that <code>\n        foo</code> used to point to would still exist in memory, and any other references to that array,\n        such as <code>bar</code> in this case, would be unaffected.<br /><br />\n\n        <code>slice</code> is better suited to copying arrays, and is not appropriate for this use case.\n        <code>Array.empty()</code> is not a native JavaScript method, so this solution would fail.",
      selectedChoice: null,
    },
    {
      title:
        "What will the following code log to the console? <pre><code class='language-javascript'>\nvar x;\nconsole.log(x);\n      </code></pre>",
      subtitle: 'not defined vs. undefined',
      choices: [
        {
          id: 'choice_0',
          choice:
            "<pre><code class='language-javascript'>ReferenceError: x is not defined</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            "<pre><code class='language-javascript'>undefined</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            "<pre><code class='language-javascript'>TypeError: x is not defined</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice:
            "<pre><code class='language-javascript'>ReferenceError: x is undefined</code></pre>",
          isSelected: false,
        },
      ],
      solution: '1',
      explanation:
        '\n\t\t\t\t<code>undefined</code> refers to a variable that has been declared but not yet assigned\n\t\t\t\ta value. <code>not defined</code> is a <code>ReferenceError</code>, thrown when a variable\n\t\t\t\tis encountered that has not yet been declared.<br /><br />\n\n\t\t\t\tIf you were to comment out the first line <code>var x;</code> and run the code\n\t\t\t\tagain, <code>ReferenceError: x is not defined</code> would be thrown. ',
      selectedChoice: null,
    },
    {
      title:
        "This code does not work correctly, it simply prints five <code>5</code>s to the console.\n\t\t\t\t\t\t\tHow can we use ES6 to fix this problem so that the code works as expected? <pre><code class='language-javascript'>\nfor (var i = 0; i < 5; i++) {\n  setTimeout(function() { console.log(i) }, i * 1000 );\n}\n      </code></pre>",
      subtitle: 'Understanding block scoping with let',
      choices: [
        {
          id: 'choice_0',
          choice:
            'By replacing the <code>var</code> keyword with <code>let</code>',
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            'By replacing the <code>var</code> keyword with <code>const</code>',
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            'By replacing the <code>function</code> keyword with <code>=></code> syntax',
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice: 'None of these answers are correct',
          isSelected: false,
        },
      ],
      solution: '0',
      explanation:
        '\n\t\t\t\tThe major advantages of the <code>let</code> keyword introduced in the ECMAScript 2015\n\t\t\t\tspecification is the ability to "block scope" a variable to a specific block, statement,\n\t\t\t\tor expression. This is unlike the <code>var</code> keyword which creates a variable that\n\t\t\t\tis scoped globally to the context it is defined in &mdash; either a function or the global\n\t\t\t\tscope. In the case of this code, replacing <code>var</code> with <code>let</code> block\n\t\t\t\tscopes <code>let</code> to the <code>for</code> loop, so that each iteration refers to a\n\t\t\t\tnew instance of the variable <code>i</code>, and 0-4 is printed to the console as expected.\n\t\t\t\t<br /><br />\n\n\t\t\t\tPrior to ES6, the best solution for this problem was to create a local scope around or within\n\t\t\t\tthe <code>setTimeout</code> function and passing in the value of <code>i</code> during each\n\t\t\t\titeration of the loop. For example, by wrapping <code>setTimeout</code> in an IIFE and invoking\n\t\t\t\tit with <code>i</code>.',
      selectedChoice: null,
    },
    {
      title:
        "What will the following code print to the console? <pre><code class='language-javascript'>\nvar foo = \"Hello World\";\nvar bar = foo.split('');\nvar baz = bar;\nbaz.reverse();\n\nconsole.log(bar.join(''));\n      </code></pre>",
      subtitle: 'Understanding Object References',
      choices: [
        {
          id: 'choice_0',
          choice:
            "<pre><code class='language-javascript'>dlroW olleH</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            "<pre><code class='language-javascript'>[ 'd', 'l', 'r', 'o', 'W', ' ', 'o', 'l', 'l', 'e', 'H' ]</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            "<pre><code class='language-javascript'>[ 'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd' ]</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice:
            "<pre><code class='language-javascript'>Hello World</code></pre>",
          isSelected: false,
        },
      ],
      solution: '0',
      explanation:
        "\n\t\t\t\tYou may have expected this code to print <code>Hello World</code>\n\t\t\t\tto the console. However, when we define <code>baz</code>, we are not\n\t\t\t\tcreating a new array. Rather, we are simply creating a reference to\n\t\t\t\tthe array that was created during the assignment of <code>bar</code>\n\t\t\t\t(in fact, both variables are just references to the same object, which\n\t\t\t\tis stored in memory behind the scenes). Since <code>baz</code> is just\n\t\t\t\ta reference to <code>bar</code>, and not its own array, any operation\n\t\t\t\tthat is performed on it, is also performed on the original array. So,\n\t\t\t\twhen we join <code>bar</code> back into a string, the result is a mirror\n\t\t\t\timage of what you might have expected! And, of course, the same result\n\t\t\t\tthat we would have gotten from <code>console.log(baz.join(' '));</code>.",
      selectedChoice: null,
    },
    {
      title:
        "What will the following code output to the console? <pre><code class='language-javascript'>\n(function foo(a) {\n  return function bar(b) {\n    console.log(a);\n  };\n})('super')('cool');\n      </code></pre>",
      subtitle: 'Understanding Scope & Closure',
      choices: [
        {
          id: 'choice_0',
          choice: "<pre><code class='language-javascript'>super</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice: "<pre><code class='language-javascript'>cool</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            "<pre><code class='language-javascript'>undefined</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice: "<pre><code class='language-javascript'>null</code></pre>",
          isSelected: false,
        },
      ],
      solution: '0',
      explanation:
        "\n\t\t\t\tThis code logs <code>super</code> to the console even though <code>a</code> is\n\t\t\t\tnever defined in the inner function <code>bar</code>, becuase <code>bar</code>\n\t\t\t\thas closure over the outer function <code>foo</code>.<br /><br />\n\n\t\t\t\tWhen a function is defined inside of another function, it is said to have \"closure\"\n\t\t\t\tover that function, meaning that it has access to the variables defined in the\n\t\t\t\touter function's scope. When execution reaches the <code>console.log()</code>\n\t\t\t\tstatement, JavaScript searches <code>bar</code>'s scope for a variable called\n\t\t\t\t<code>a</code>. When it does not find one, it then searches the scope \"bubble\"\n\t\t\t\tthat is the next level up, in this case, the scope created by <code>foo</code>.\n\t\t\t\tIf <code>a</code> was <em>not</em> defined in <code>foo</code>, the search would\n\t\t\t\tcontinue, moving up to the next scope. If the outer-most, or global scope is reached\n\t\t\t\tand a variable is still not found, JavaScript will throw a <code>ReferenceError</code>.\n\t\t\t\t<br /><br />\n\n\t\t\t\tIf the way that these functions are called tripped you up, here's the explanation:\n\t\t\t\t<code>foo</code> is an immediately invoked function expression (or IIFE), invoked\n\t\t\t\tby the parentheses that contain <code>'super'</code>. This expression resolves\n\t\t\t\tbefore anything else occurs, and since it resolves to the function <code>bar</code>,\n\t\t\t\tthe second set of parentheses are simply invoking that function, and thus the\n\t\t\t\t<code>console.log()</code> statement is executed.",
      selectedChoice: null,
    },
    {
      title:
        "When executed in a browser's console, what will the following code output? <pre><code class='language-javascript'>\nvar foo = {\n  baz: 'Hello',\n  bar: () => {\n    console.log(this);\n    return this.baz;\n  }\n};\n\nconsole.log(foo.bar());\n      </code></pre>",
      subtitle: 'Arrow Functions as Object Methods',
      choices: [
        {
          id: 'choice_0',
          choice:
            "<pre><code class='language-javascript'>{ baz: 'Hello', bar: [Function: bar] }\nHello</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            "<pre><code class='language-javascript'>{ baz: 'Hello', bar: [Function: bar] }\nHello</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            "<pre><code class='language-javascript'>Window {...}\nHello</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice:
            "<pre><code class='language-javascript'>{ baz: 'Hello', bar: [Function: bar] }\nundefined</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_4',
          choice:
            "<pre><code class='language-javascript'>Window {...}\nundefined</code></pre>",
          isSelected: false,
        },
      ],
      solution: '3',
      explanation:
        "\n  \t\t\tYou might have expected this code to log the <code>foo</code> object along\n  \t\t\twith <code>Hello</code> to the console, however, arrow function expressions\n  \t\t\tare not ideally suited for method functions. Here's why: arrow functions do\n  \t\t\tnot create their own <code>this</code> context, nor do they care how the\n  \t\t  function is called; rather, they inherit their <code>this</code> value from\n  \t\t\tthe enclosing scope. So in this case, <code>this</code> still refers to the\n  \t\t\tglobal context, in which <code>baz</code> is not defined. Had <code>bar</code>\n        been written with the <code>function</code> keyword, this code <em>would</em>\n        have worked as expected, since typically, when a function is invoked with\n        method invokation, <code>this</code> will always refer to the context,\n        or object, that the function was written in.\n  \t\t\t<br /><br />\n\n  \t\t\tNote that in different environments, the global <code>this</code> value can\n  \t\t\treference different things. Running this code in a browser's console, as in\n  \t\t\tthis example, <code>this</code> will always refer to the global <code>Window\n  \t\t\t</code> object. If we ran this same code in a Node environment, however, the\n  \t\t\t<code>this</code> value would simply be an empty global object: <code>{}</code>.\n  \t\t\t<br /><br />\n\n  \t\t\tIn general, there's no other reason why arrow functions are not an appropriate\n  \t\t\tchoice for object methods. So if you use them in this way, just be careful with\n  \t\t\t<code>this</code>!",
      selectedChoice: null,
    },
    {
      title:
        'What will the following code output to the console? <pre><code class=\'language-javascript\'>\nconsole.log(1 + -"1" + "2" + "2");\nconsole.log("2" + "2" + 1 + -"1");\n      </code></pre>',
      subtitle: 'Learn Coercion',
      choices: [
        {
          id: 'choice_0',
          choice: "<pre><code class='language-javascript'>4\n4</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            "<pre><code class='language-javascript'>022\n221-1</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice: "<pre><code class='language-javascript'>04\n220</code></pre>",
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice:
            "<pre><code class='language-javascript'>022\n220</code></pre>",
          isSelected: false,
        },
      ],
      solution: '1',
      explanation:
        '\n\t\t\t\tWhat makes this code a bit tricky is the fact that JavaScript is a "weakly" or "loosely"\n\t\t\t\ttyped language. This means that, in part, JavaScript will allow operations to be performed\n\t\t\t\ton values that are not of the same data types, and as a result, it will "coerce" values that\n\t\t\t\tare not of the same type in order to accomodate the operation. This has a significant impact\n\t\t\t\ton the above code snippets. Let\'s look at each example in turn.<br><br>\n\n\t\t\t\tEx: <code>console.log(1 + -"1" + "2" - "2");</code><br>\n\t\t\t\tIn JavaScript, the negation symbol, e.g. <code>-x</code>, is treated as a unary operator, and,\n\t\t\t\taccording to order of operations precedence, is evaluated before the four standard mathematical\n\t\t\t\toperators (<code>+</code>, <code>-</code>, <code>/</code>, <code>*</code>). Thus in this snippet,\n\t\t\t\tthe first operation performed is the negation of <code>"1"</code>. Since this value is a string,\n\t\t\t\tto accomodate this operation, <code>"1"</code> is converted to a number. From here, the expression\n\t\t\t\tis evaluated from left to right, since all other operators are treated equally in precedence. First\n\t\t\t\t<code>1</code> is added to <code>-1</code>, resulting in <code>0</code>, followed by <code>0  + "2"\n\t\t\t\t</code>. However, since one of these two values is a string, the remaining value is coerced into a\n\t\t\t\tstring, and concatenation is performed rather than addition. Now we are left with <code>"02" + "2"\n\t\t\t\t</code>, a simple string concatenation with no coersion necessary, giving us the final result of\n\t\t\t\t<code>"022"</code><br><br>\n\n\t\t\t\tEx: <code>console.log("2" + "2" + 1 + -"1");</code><br>\n\t\t\t\tThis example is nearly identical. However, even though <code>"1"</code> is coerced into a number\n\t\t\t\tbefore any other operations are performed, <code>-1</code> is then coerced back into a string since\n\t\t\t\tit is a part of the final evaluation: <code>"2" + "2"</code> results in <code>"22"</code>,\n\t\t\t\t<code>"22" + 1</code> results in <code>"221"</code>, and <code>"221" + -1</code> gives us\n\t\t\t\t<code>"221-1"</code>.',
      selectedChoice: null,
    },
    {
      title: 'Is JavaScript single-threaded or multi-threaded?',
      subtitle: 'Threading',
      choices: [
        {
          id: 'choice_0',
          choice: 'JavaScript is single-threaded.',
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice: 'JavaScript is multi-threaded.',
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice: 'Threading only applies in staticly typed languages.',
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice: 'Threading only applies to compiled languages.',
          isSelected: false,
        },
      ],
      solution: '0',
      explanation:
        "Unlike some other programming languages which have multi-threaded capabilities,\n        JavaScript execution is single-threaded (at a high level). When running in a browser,\n        JavaScript runs on a single event-loop. However, the browser implementation of the JavaScript\n        engine may incorporate multi-threading in order to actually process execution. Despite this, the\n        JavaScript programmer doesn't have the ability to actual write JavaScript in a multi-threaded\n        way, with the exception of Web Workers.",
      selectedChoice: null,
    },
    {
      title:
        'Which of the following is a feature provided by ES6 arrow functions?',
      subtitle: 'ES6 Arrow Functions',
      choices: [
        {
          id: 'choice_0',
          choice: 'They allow for functional composition.',
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice: 'They are prone to fewer memory leaks.',
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            'They "inherit" <code>this</code> from the enclosing lexical context, regardless of how the function is called.',
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice: 'The only advantage is shorter syntax.',
          isSelected: false,
        },
      ],
      solution: '2',
      explanation:
        'ES6 arrow functions take <code>this</code> from the context where they are written\n        and implicitly bind it to the function. Now, regardless of where that function is called it will\n        retain the original <code>this</code> value. The same result could be accomplished by explicitly\n        binding this (e.g. <code>.bind(this)</code>) to the function in the context you want to bind\n        <code>this</code>. Otherwise, for non-arrow functions, <code>this</code> will be defined by\n        the context in which a function is called.',
      selectedChoice: null,
    },
    {
      title:
        'The use of <code>const</code> prevents the modification of arrays and objects.',
      subtitle: 'Constant Values',
      choices: [
        {
          id: 'choice_0',
          choice: 'True, these are now constant values.',
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            'False, they are only references. The actual values in the array or object can still be mutated.',
          isSelected: false,
        },
      ],
      solution: '1',
      explanation:
        'The use of <code>const</code> prevents a value from being reassigned. Arrays and objects, however,\n        can be modified without being reassigned. If you have a <code>const</code> object <code>dictionary</code>\n        and you write <code>dictionary[freecodecamp] = true</code> this code will run without error. However,\n        if you were to try to reassign this constant value by writing <code>dictionary = 5</code>, this would\n        throw an error: <code>Uncaught TypeError: Assignment to constant variable</code>. This is an important\n        aspect to keep in mind when working with constant values in JavaScript.',
      selectedChoice: null,
    },
    {
      title:
        'What is the difference between <code>==</code> and <code>===</code> in JavaScript?',
      subtitle: 'Equality in JavaScript',
      choices: [
        {
          id: 'choice_0',
          choice:
            '<code>==</code> represent abstract equality and allows type coercion, whereas\n          <code>===</code> uses strict equality and will not coerce its arguments.',
          isSelected: false,
        },
        {
          id: 'choice_1',
          choice:
            'These operators are interchangeable and both test for equality.',
          isSelected: false,
        },
        {
          id: 'choice_2',
          choice:
            '<code>===</code> can be used to test deep equality of arrays and objects, whereas\n          <code>==</code> cannot.',
          isSelected: false,
        },
        {
          id: 'choice_3',
          choice: 'None of these are correct.',
          isSelected: false,
        },
      ],
      solution: '0',
      explanation:
        'The difference between these two equality operators is that the first allows\n        type coercion and the second does not. Because JavaScript is a loosely typed language,\n        the abstract equality operator can establish equality between dissimilar types. For instance,\n        <code>"2" == 2</code> evaluates to <code>true</code>, however, this would fail under a check\n        of strict equality. Generally, strict equality is safer and preferred, but it\'s good to\n        understand the difference between these two equality operators.',
      selectedChoice: null,
    },
  ],
};
