import Layout from '../components/layout'

export default () => (
  <Layout title='Chapter 3'>
    <div>
          <style jsx>{`
     	.chapter {font-family: Verdana; background-color: #6081ac; color: #CEDDF1; font-size: 120px; padding: 0.5em; }
     	.col-md-6 {border-radius: 4px; overflow: hidden; box-shadow: 0 9px 9px rgba(0, 0, 0, 0.9); display: block; min-height: 70%; font-family: Verdana; max-width: 1100px; background-color: #CEDDF1; margin: auto; margin-top: auto; margin-right: auto; margin-bottom: auto; margin-left: auto; white-space: pre-wrap; border: none; box-sizing: border-box; color: #2D0D0D; line-height: 1.1; padding: 4.7em} .home {margin: 1.5em 0;} 
     	h1 {color: #867452; font-size: 60px;} 
     	h2 {color: #867452; font-size: 40px} 
     	h3 {color: #867452; font-size: 30px} 
     	.it, .listit {color: brown; font-size: 24px; font-style: italic; letter-spacing: 0.04em; } 
     	.p, .listitem {color: #75AFAD; font-size: 24px; font-style: italic; letter-spacing: 0.04em;} pre {display: block; font-family: monospace; white-space: pre; margin: 1em 0; font-size: 16px} 
     	code{margin: auto; font-family:"Lucida Console"; "Andale Mono"; "Courier New"; Courier; monospace; font-style:normal; color:#395C73;} 
     	code strong {color:#000; background:#F5FD11; padding:1px; font-weight:normal;} 
     	.interno {font-family: verdana; font-style: italic; color: #395C73; font-size: 24px;} 
     	.sub{text-decoration: underline;} 
     	.im {color: #04445c;} 
     	.re {color: #650669;} .sub{text-decoration: underline; } blockquote {color: #111AD5; font-size: 24px; font-style: italic; letter-spacing: 0.04em;} 
     	.note { padding:3px; background: orange; margin-top: 1em; margin-bottom: 1em; margin-left: 40px; margin-right: 40px;}
     	`}</style>

    <div className="col-md-6"> 
<p className="chapter">3</p>
<h1>Working with Functions</h1>
<p className="it">Las funciones son el caballo de batalla de JavaScript, sirviendo simultáneamente como mecanismo principal de abstracción y mecanismo de implementación del programador. Las funciones por sí solas desempeñan roles que otros lenguajes cumplen con múltiples características distintas: procedimientos, métodos, constructores e incluso clases y módulos. Una vez que te sientes cómodo con los puntos más finos de las funciones, has dominado una parte significativa de JavaScript. El otro lado de la moneda es que puede tomar algún tiempo para aprender a utilizar las funciones de manera efectiva en diferentes contextos.</p>

<p className="p">Functions are JavaScript’s workhorse, serving simultaneously as the programmer’s primary abstraction facility and implementation mechanism. Functions alone play roles that other languages fulfill with multiple distinct features: procedures, methods, constructors, and even classes and modules. Once you become comfortable with the finer points of functions, you have mastered a significant portion of JavaScript. The flip side of the coin is that it can take some time to learn how to use functions effectively in different contexts.</p>

<h3> Item 18: Understand the Difference between Function, Method, and Constructor Calls</h3> 
<p className="it">Si está familiarizado con la programación orientada a objetos, es probable que esté acostumbrado a pensar en funciones, métodos y constructores de clases como tres cosas distintas. En JavaScript, estos son sólo tres patrones de uso diferentes de una única construcción: funciones.</p>

<p className="p">If you’re familiar with object-oriented programming, you’re likely accustomed to thinking of functions, methods, and class constructors as three separate things. In JavaScript, these are just three different usage patterns of one single construct: functions.</p>
<p className="it">El patrón de uso más simple es la llamada a la función:</p>

<p className="p">The simplest usage pattern is the function call:</p>
<pre><code>function hello(username) &#123;<br></br>
return "hello, " + username;<br></br>
&#125;<br></br>
hello("Keyser Söze"); // "hello, Keyser Söze"</code></pre>
<p className="it">Esto hace exactamente lo que parece: Llama a la función hello y enlaza el parámetro name a su argumento dado.</p>

<p className="p">This does exactly what it looks like: It calls the hello function and binds the name parameter to its given argument.</p>
<p className="it">Los métodos en JavaScript no son más que propiedades de objetos que pasan a ser funciones:</p>

<p className="p">Methods in JavaScript are nothing more than object properties that happen to be functions:</p>
<pre><code>
var obj = &#123;<br></br>
hello: function() &#123;<br></br>
return "hello, " + this.username;<br></br>
&#125;,<br></br>
<br></br>
<br></br>
username: "Hans Gruber"<br></br>
&#125;;<br></br>
obj.hello(); // "hello, Hans Gruber"</code></pre>
<p className="it">Observe cómo hola se refiere a esto para acceder a las propiedades de obj. Usted puede ser tentado a asumir que esto obtiene obligado a obj porque el método hello se definió en obj. Pero podemos copiar una referencia a la misma función en otro objeto y obtener una respuesta diferente:</p>

<p className="p">Notice how hello refers to this to access the properties of obj. You might be tempted to assume that this gets bound to obj because the hello method was defined on obj. But we can copy a reference to the same function in another object and get a different answer:</p>
<pre><code>var obj2 = &#123;<br></br>
hello: obj.hello, username: "Boo Radley"<br></br>
&#125;;<br></br>
obj2.hello(); // "hello, Boo Radley"</code></pre>
<p className="it">Lo que realmente ocurre en una llamada de método es que la expresión de llamada en sí determina el enlace de esto, también conocido como receptor de la llamada. La expresión obj.hello () busca la propiedad hello de obj y la llama con obj receptor. La expresión obj2.hello () busca la propiedad hello de obj2 -que pasa a ser la misma función que obj.hello- pero la llama con el receptor obj2. En general, llamar a un método en un objeto busca el método y luego utiliza el objeto como receptor del método.</p>

<p className="p">What really happens in a method call is that the call expression itself determines the binding of this,  also known as the call’s receiver.  The expression obj.hello() looks up the hello property of obj and calls it with receiver obj. The expression obj2.hello() looks up the hello property of obj2—which happens to be the same function as obj.hello—but calls it with receiver obj2. In general, calling a method on an object looks up the method and then uses the object as the method’s receiver.</p>
<p className="it">Puesto que los métodos no son nada más que funciones llamadas a un objeto particular, no hay razón por la cual una función ordinaria no pueda referirse a esto:</p>

<p className="p">Since methods are nothing more than functions called on a particular object, there is no reason why an ordinary function can’t refer to this:</p>
<pre><code>function hello() &#123;<br></br>
return "hello, " + this.username;<br></br>
&#125;</code></pre>
<p className="it">Esto puede ser útil para predefinir una función para compartir entre varios objetos:</p>

<p className="p">This can be useful for predefining a function for sharing among multiple objects:</p>
<pre><code>var obj1 = &#123;<br></br>
hello: hello,<br></br>
username: "Gordon Gekko"<br></br>
&#125;;<br></br>
obj1.hello(); // "hello, Gordon Gekko"<br></br>
<br></br>
var obj2 = &#123;<br></br>
hello: hello,<br></br>
username: "Biff Tannen"<br></br>
&#125;;<br></br>
obj2.hello(); // "hello, Biff Tannen"</code></pre>
<p className="it">Sin embargo, una función que utiliza esto no es particularmente útil para llamar como una función en lugar de un método:</p>

<p className="p">However, a function that uses this is not particularly useful to call as a function rather than a method:</p>
<pre><code>hello(); // "hello, undefined"</code></pre>
<p className="it">De forma poco útil, una llamada de función no-método proporciona el objeto global como el receptor, que en este caso no tiene ninguna propiedad llamada nombre y produce indefinido. Llamar a un método como una función rara vez hace algo útil si el método depende de esto, ya que no hay razón para esperar que el objeto global coincida con las expectativas que tiene el método del objeto en el que se llama. De hecho, la vinculación al objeto global es un problema suficientemente problemático que el modo estricto de ES5 cambia el enlace predeterminado de esto a undefined:</p>

<p className="p">Rather unhelpfully, a nonmethod function call provides the global object as the receiver, which in this case has no property called name and produces undefined. Calling a method as a function rarely does anything useful if the method depends on this, since there is no reason to expect the global object to match the expectations that the method has of the object it is called on. In fact, binding to the global object is a problematic enough default that ES5’s strict mode changes the default binding of this to undefined:</p>
<pre><code>function hello() &#123; "use strict";<br></br>
return "hello, " + this.username;<br></br>
&#125;<br></br>
hello(); // error: cannot read property "username" of undefined</code></pre>
<p className="it">Esto ayuda a detectar un uso inadecuado accidental de los métodos como funciones simples al fallar más rápidamente, ya que intentar acceder a las propiedades de undefined inmediatamente arroja un error.</p>

<p className="p">This helps catch accidental misuse of methods as plain functions by failing more quickly, since attempting to access properties of undefined immediately throws an error.</p>
<p className="it">El tercer uso de funciones es como constructores. Al igual que los métodos y las funciones simples, los constructores se definen con la función:</p>

<p className="p">The third use of functions is as constructors. Just like methods and plain functions, constructors are defined with function:</p>
<pre><code>
function User(name, passwordHash) &#123; this.name = name; this.passwordHash = passwordHash;<br></br>
&#125;</code></pre>
<p className="it">Invocar al usuario con el nuevo operador lo trata como un constructor:</p>

<p className="p">Invoking User with the new operator treats it as a constructor:</p>
<pre><code>var u = new User("sfalken",<br></br>
"0ef33ae791068ec64b502d6cb0191387");<br></br>
u.name; // "sfalken"
</code></pre>
<p className="it">A diferencia de las llamadas de función y las llamadas al método, una llamada del constructor pasa un objeto nuevo como el valor de este, e implícitamente devuelve el nuevo objeto como su resultado. La función principal de la función constructora es inicializar el objeto.</p>

<p className="p">Unlike function calls and method calls, a constructor call passes a brand-new object as the value of this, and implicitly returns the new object as its result. The constructor function’s primary role is to initialize the object.</p>

<h3> Things to Remember</h3> 
<p className="it">Las llamadas de método proporcionan el objeto en el que se busca la propiedad del método como su receptor.</p>

<p className="p">Method calls provide the object in which the method property is looked up as their receiver.</p>
<p className="it">Las llamadas de función proporcionan el objeto global (o indefinido para funciones estrictas) como su receptor. Los métodos de llamada con sintaxis de llamada de función rara vez son útiles.</p>

<p className="p">Function calls provide the global object (or undefined for strict functions) as their receiver. Calling methods with function call syntax is rarely useful.</p>
<p className="it">Los constructores son llamados con nuevos y reciben un objeto nuevo como su receptor.</p>

<p className="p">Constructors are called with new and receive a fresh object as their receiver.</p>


<h3> Item 19: Get Comfortable Using Higher-Order Functions</h3> 
<p className="it">Las funciones de orden superior solían ser un shibboleth de los monjes de la programación funcional, un término esotérico para lo que parecía una técnica de programación avanzada. Nada mas lejos de la verdad. La explotación de la elegancia concisa de las funciones a menudo puede conducir a un código más simple y más sucinto. A lo largo de los años, los lenguajes de scripting han adoptado estas técnicas y en el proceso tomado gran parte del misterio de algunos de los mejores modismos de programación funcional.</p>

<p className="p">Higher-order functions used to be a shibboleth of the monks of functional programming, an esoteric term for what seemed like an advanced programming technique. Nothing could be further from the truth. Exploiting the concise elegance of functions can often lead to simpler and more succinct code. Over the years, scripting languages have adopted these techniques and in the process taken much of the mystery out of some of the best idioms of functional programming.</p>
<p className="it">Las funciones de orden superior no son más que funciones que toman otras funciones como argumentos o funciones de retorno como su resultado. Tomando una función como un argumento (a menudo denominado como una función de devolución de llamada porque es "devuelto" por la función de orden superior) es un idioma particularmente potente y expresivo, y que los programas de JavaScript utilizan intensamente.</p>

<p className="p">Higher-order functions are nothing more than functions that take other functions as arguments or return functions as their result. Taking a function as an argument (often referred to as a callback function because it is “called back” by the higher-order function) is a particularly powerful and expressive idiom, and one that JavaScript programs use heavily.</p>
<p className="it">Considere el método de clasificación estándar en matrices. Para trabajar en todos los arrays posibles, el método de clasificación depende de la persona que llama para determinar cómo comparar cualquier dos elementos en una matriz:</p>

<p className="p">Consider the standard sort method on arrays. In order to work on all possible arrays, the sort method relies on the caller to determine how to compare any two elements in an array:</p>
<pre><code>
function compareNumbers(x, y) &#123;<br></br>
if (x &#60; y) &#123;<br></br>
return -1;<br></br>
&#125;<br></br>
if (x &#62; y) &#123;<br></br>
return 1;<br></br>
&#125;<br></br>
return 0;<br></br>
&#125;<br></br>
[3, 1, 4, 1, 5, 9].sort(compareNumbers); // [1, 1, 3, 4, 5, 9]</code></pre>
<p className="it">La biblioteca estándar podría haber requerido que el llamador pasara un objeto con un método de comparación, pero como sólo se requiere un método, tomar una función directamente es más simple y más conciso. De hecho, el ejemplo anterior se puede simplificar más con una función anónima:</p>

<p className="p">The standard library could have required the caller to pass in an object with a compare method, but since only one method is required, taking a function directly is simpler and more concise. In fact, the above example can be simplified further with an anonymous function:</p>
<pre><code>
[3, 1, 4, 1, 5, 9].sort(function(x, y) &#123;<br></br>
if (x &#60; y) &#123;<br></br>
return -1;<br></br>
&#125;<br></br>
if (x &#62; y) &#123;<br></br>
return 1;<br></br>
&#125;<br></br>
return 0;<br></br>
&#125;); // [1, 1, 3, 4, 5, 9]</code></pre>
<p className="it">Aprender a usar funciones de orden superior a menudo puede simplificar su código y eliminar tedioso boilerplate. Muchas operaciones comunes en matrices tienen encantadoras abstracciones de orden superior que vale la pena familiarizarse con. Considere el simple acto de transformar una matriz de cadenas. Con un bucle, escribiríamos:</p>

<p className="p">Learning to use higher-order functions can often simplify your code and eliminate tedious boilerplate. Many common operations on arrays have lovely higher-order abstractions that are worth familiarizing yourself with. Consider the simple act of transforming an array of strings. With a loop, we’d write:</p>
<pre><code>
var names = ["Fred", "Wilma", "Pebbles"];<br></br>
var upper = [];<br></br>
for (var i = 0, n = names.length; i &#60; n; i++) &#123; upper[i] = names[i].toUpperCase();<br></br>
&#125;<br></br>
upper; // ["FRED", "WILMA", "PEBBLES"]<br></br>
With the handy map method  of  arrays  (introduced  in  ES5),  we  can completely eliminate the loop details, implementing just the element-by-element transformation with a local function:<br></br>
var names = ["Fred", "Wilma", "Pebbles"];<br></br>
var upper = names.map(function(name) &#123;<br></br>
return name.toUpperCase();<br></br>
&#125;);<br></br>
upper; // ["FRED", "WILMA", "PEBBLES"]</code></pre>
<p className="it">Una vez que usted consigue el cuelgue de usar las funciones de orden más alto, usted puede comenzar a identificar oportunidades de escribir su propio. El signo revelador de una abstracción de orden superior esperando a suceder es un código duplicado o similar. Por ejemplo, imagine que encontramos una parte de un programa construyendo una cadena con las letras del alfabeto:</p>

<p className="p">Once you get the hang of using higher-order functions, you can  start identifying opportunities to write your own. The telltale sign     of a higher-order abstraction waiting to happen is duplicate or similar code. For example, imagine we found one part of a program constructing a string with the letters of the alphabet:</p>
<pre><code>
var aIndex = "a".charCodeAt(0); // 97<br></br>var alphabet = "";<br></br>
for (var i = 0; i &#60; 26; i++) &#123;<br></br>
alphabet += String.fromCharCode(aIndex + i);<br></br>
&#125;<br></br>
alphabet; // "abcdefghijklmnopqrstuvwxyz"</code></pre>
<p className="it">Mientras tanto, otra parte del programa genera una cadena que contiene dígitos numéricos:</p>

<p className="p">Meanwhile, another part of the program generates a string containing numeric digits:</p>
<pre><code>
var digits = "";<br></br>
for (var i = 0; i &#60; 10; i++) &#123; digits += i;<br></br>
&#125;<br></br>
digits; // "0123456789"</code></pre>
<p className="it">Aún en otro lugar, el programa crea una cadena aleatoria de caracteres:</p>

<p className="p">Still elsewhere, the program creates a random string of characters:</p>
<pre><code>var random = "";<br></br>for (var i = 0; i &#60; 8; i++) &#123;<br></br>
 random += String.fromCharCode(Math.floor(Math.random()	26)<br></br>
+ aIndex);<br></br>
&#125;<br></br>
random; // "bdwvfrtp" (different result each time)</code></pre>
<p className="it">Cada ejemplo crea una cadena diferente, pero todos comparten una lógica común. Cada bucle crea una cadena concatenando los resultados de algún cálculo para crear cada segmento individual. Podemos extraer las partes comunes y moverlas en una sola función de utilidad:</p>

<p className="p">Each example creates a different string, but they all share common logic. Each loop creates a string by concatenating the results of some computation to create each individual segment. We can extract the common parts and move them into a single utility function:</p>
<pre><code>
function buildString(n, callback) &#123;<br></br>
var result = "";<br></br>
for (var i = 0; i &#60; n; i++) &#123; result += callback(i);<br></br>
&#125;<br></br>
return result;<br></br>
&#125;</code></pre>
<p className="it">Observe cómo la implementación de buildString contiene todas las partes comunes de cada bucle, pero utiliza un parámetro en lugar de las partes que varían: El número de iteraciones de bucle se convierte en la variable n, y la construcción de cada segmento de cadena se convierte en una llamada a la devolución de llamada función. Ahora podemos simplificar cada uno de los tres ejemplos para usar buildString:</p>

<p className="p">Notice how the implementation of buildString contains all the common parts of each loop, but uses a parameter in place of the parts that vary: The number of loop iterations becomes the variable n,   and the construction of each string segment becomes a call to the callback function. We can now simplify each of the three examples to use buildString:</p>
<pre><code>var alphabet = buildString(26, function(i) &#123;<br></br>
return String.fromCharCode(aIndex + i);<br></br>
&#125;);<br></br>
alphabet; // "abcdefghijklmnopqrstuvwxyz"<br></br>var digits = buildString(10, function(i) &#123; return i; &#125;); digits; // "0123456789"<br></br>var random = buildString(8, function() &#123;<br></br>
 return String.fromCharCode(Math.floor(Math.random()	26)<br></br>
+ aIndex);<br></br>
&#125;);<br></br>
random; // "ltvisfjr" (different result each time)</code></pre>
<p className="it">Hay muchos beneficios en la creación de abstracciones de orden superior. Si hay partes difíciles de la implementación, como obtener las condiciones de contorno de bucle correctamente, se localizan en la implementación de la función de orden superior. Esto le permite corregir cualquier error en la lógica sólo una vez, en lugar de tener que buscar cada instancia del patrón de codificación distribuido a través de su programa. Si usted encuentra que necesita para optimizar la eficiencia de la operación, de nuevo sólo tiene un lugar donde usted necesita para cambiar nada. Por último, dar un nombre claro como buildString a la abstracción hace que sea más claro para alguien que lea el código lo que hace el código, sin tener que decodificar los detalles de la implementación.</p>

<p className="p">There are many benefits to creating higher-order abstractions. If there are tricky parts of the implementation, such as getting the loop boundary conditions right, they are localized to the implementation  of the higher-order function. This allows you to fix any bugs in the logic just once, instead of having to hunt for every instance of the coding pattern spread throughout your program. If you find you need to optimize the efficiency of the operation, you again only have one place where you need to change anything. Finally, giving a clear name such as buildString to the abstraction makes it clearer to someone reading the code what the code does, without having to decode the details of the implementation.</p>
<p className="it">Aprender a alcanzar una función de orden superior cuando te encuentras escribiendo repetidamente los mismos patrones conduce a un código más conciso, una mayor productividad y una mejor legibilidad. Mantener un ojo hacia fuera para los patrones comunes y moviéndolos en funciones de utilidad de orden más alto es un hábito importante a desarrollar.</p>

<p className="p">Learning to reach for a higher-order function when you find yourself repeatedly writing the same patterns leads to more concise code, higher productivity, and improved readability. Keeping an eye out for common patterns and moving them into higher-order utility functions is an important habit to develop.</p>

<h3> Things to Remember</h3> 
<p className="it">Las funciones de orden superior son funciones que toman otras funciones como argumentos o funciones de retorno como su resultado.</p>

<p className="p">Higher-order functions are functions that take other functions as arguments or return functions as their result.</p>
<p className="it">Familiarícese con las funciones de orden superior en las bibliotecas existentes.</p>

<p className="p">Familiarize yourself with higher-order functions in existing libraries.</p>
<p className="it">Aprenda a detectar patrones de codificación comunes que pueden ser reemplazados por funciones de orden superior.</p>

<p className="p">Learn to detect common coding patterns that can be replaced by higher-order functions.</p>

<h3> Item 20: Use call to Call Methods with a Custom Receiver</h3> 
<p className="it">Normalmente, el receptor de una función o método (es decir, el valor vinculado a la palabra clave especial este) está determinado por la sintaxis de su llamador. En particular, la sintaxis de llamada de método vincula el objeto en el que se buscó el método hasta este. Sin embargo, a veces es necesario llamar a una función con un receptor personalizado y la función ya no puede ser una propiedad del objeto receptor deseado. Es posible, por supuesto, agregar el método al objeto como una nueva propiedad:</p>

<p className="p">Ordinarily, the receiver of a function or method (i.e., the value bound to the special keyword this) is determined by the syntax of its caller. In particular, the method call syntax binds the object in which the method was looked up to this. However,  it is sometimes necessary  to call a function with a custom receiver, and the function may not already be a property of the desired receiver object. It’s possible, of course, to add the method to the object as a new property:</p>
<pre><code>
obj.temporary = f;	// what if obj.temporary already existed?<br></br>
var result = obj.temporary(arg1, arg2, arg3);<br></br>
delete obj.temporary; // what if obj.temporary already existed?</code></pre>
<p className="it">Pero este enfoque es desagradable e incluso peligroso. A menudo es indeseable, e incluso a veces imposible, modificar obj. Específicamente, cualquier nombre que elija para la propiedad temporal, corre el riesgo de colisionar con una propiedad existente de obj. Además, algunos objetos pueden ser congelados o sellados, evitando la adición de nuevas propiedades. Y más generalmente, es mala práctica ir alrededor que agrega arbitrariamente propiedades a los objetos, particularmente a los objetos que usted no creó (véase el Punto 42).</p>

<p className="p">But this approach is unpleasant and even dangerous. It is often undesirable, and even sometimes impossible, to modify obj. Specifically, whatever name you choose for the temporary property, you run the risk  of  colliding  with an existing  property  of  obj.  Moreover,  some objects can be frozen or sealed, preventing the addition of any new properties. And more generally, it’s bad practice to go around arbitrarily adding properties to objects, particularly objects you didn’t create (see Item 42).</p>
<p className="it">Por suerte, las funciones vienen con un método de llamada incorporado para proporcionar un receptor personalizado. Invocación de una función mediante su método de llamada:</p>

<p className="p">Luckily, functions come with a built-in call method for providing a custom receiver. Invoking a function via its call method:</p>
<pre><code>
f.call(obj, arg1, arg2, arg3); behaves similarly to calling it directly: f(arg1, arg2, arg3);</code></pre>
<p className="it">Excepto que el primer argumento proporciona un objeto receptor explícito.</p>

<p className="p">except that the first argument provides an explicit receiver object.</p>
<p className="it">El método de llamada es útil para los métodos de llamada que pueden haber sido eliminados, modificados o anulados. El ítem 45 muestra un ejemplo útil, donde el método hasOwnProperty se puede llamar a un objeto arbitrario, incluso si el objeto es un diccionario. En un objeto de diccionario, buscar hasOwnProperty produce una entrada del diccionario en lugar de un método heredado:</p>

<p className="p">The call method comes in handy for calling methods that may have been removed, modified, or overridden. Item 45 shows a useful example, where the hasOwnProperty method can be called on an arbitrary object, even if the object is a dictionary. In a dictionary object, looking up hasOwnProperty produces an entry from the dictionary rather than an inherited method:</p>
<pre><code> 
dict.hasOwnProperty = 1;<br></br>
dict.hasOwnProperty("foo"); // error: 1 is not a function</code></pre>
<p className="it">El uso del método de llamada del método hasOwnProperty hace posible llamar al método en el diccionario aunque el método no se almacene en ninguna parte del objeto:</p>

<p className="p">Using the call method of the hasOwnProperty method makes it possible to call the method on the dictionary even though the method is not stored anywhere in the object:</p>
<pre><code>var hasOwnProperty = &#123;&#125;.hasOwnProperty; dict.foo = 1;<br></br>
delete dict.hasOwnProperty; hasOwnProperty.call(dict, "foo");	// true<br></br>
hasOwnProperty.call(dict, "hasOwnProperty"); // false</code></pre>
<p className="it">El método de llamada también puede ser útil cuando se definen funciones de orden superior. Un lenguaje común para una función de orden superior es aceptar un argumento opcional para proporcionar como receptor para llamar a la función. Por ejemplo, un objeto que representa una tabla de enlaces clave-valor podría proporcionar un método forEach:</p>

<p className="p">The call method can also be useful when defining higher-order functions. A common idiom for a higher-order function is to accept an optional argument to provide as the receiver for calling the function. For example, an object that represents a table of key-value bindings might provide a forEach method:</p>
<pre><code>
var table = &#123;<br></br>
entries: [],<br></br>
addEntry: function(key, value) &#123;<br></br>
this.entries.push(&#123; key: key, value: value &#125;);<br></br>
&#125;,<br></br>
forEach: function(f, thisArg) &#123;<br></br>
var entries = this.entries;<br></br>
for (var i = 0, n = entries.length; i &#60; n; i++) &#123;<br></br>
var entry = entries[i];<br></br>
f.call(thisArg, entry.key, entry.value, i);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">Esto permite a los consumidores del objeto utilizar un método como la función de devolución de llamada f de table.forEach y proporcionar un receptor sensible para el método. Por ejemplo, podemos copiar convenientemente el contenido de una tabla en otra:</p>

<p className="p">This allows consumers of the object to use a method as the callback function f of table.forEach and provide a sensible receiver for the method. For example, we can conveniently copy the contents of one table into another:</p>
<pre><code>table1.forEach(table2.addEntry, table2);</code></pre>
<p className="it">Este código extrae el método addEntry de table2 (podría incluso haber extraído el método de Table.prototype o table1), y el método forEach repetidamente llama a addEntry con table2 como receptor. Observe que aunque addEntry sólo espera dos argumentos, forEach lo llama con tres: a key, value, and index. El argumento del índice extra es inofensivo ya que addEntry simplemente lo ignora.</p>

<p className="p">This code extracts the addEntry method from table2 (it could have even extracted the method from Table.prototype or table1), and the forEach method repeatedly calls addEntry with table2 as the receiver. Notice that even though addEntry only expects two arguments, forEach calls it with three: a key, value, and index. The extra index argument is harmless since addEntry simply ignores it.</p>

<h3> Things to Remember</h3> 
<p className="it">Utilice el método de llamada para llamar a una función con un receptor personalizado.</p>

<p className="p">Use the call method to call a function with a custom receiver.</p>
<p className="it">Utilice el método de llamada para llamar a métodos que pueden no existir en un objeto determinado.</p>

<p className="p">Use the call method for calling methods that may not exist on a given object.</p>
<p className="it">Utilice el método de llamada para definir funciones de orden superior que permiten a los clientes proporcionar un receptor para la devolución de llamada.</p>

<p className="p">Use the call method for defining higher-order functions that allow clients to provide a receiver for the callback.</p>

<h3> Item 21: Use apply to Call Functions with Different Numbers of Arguments</h3> 
<p className="it">Imagine que alguien nos proporciona una función que calcula el promedio de cualquier número de valores:</p>

<p className="p">Imagine that someone provides us with a function that calculates the average of any number of values:</p>
<pre><code>average(1, 2, 3);	// 2<br></br>
average(1);	// 1<br></br>
average(3, 1, 4, 1, 5, 9, 2, 6, 5); // 4<br></br>
average(2, 7, 1, 8, 2, 8, 1, 8); // 4.625</code></pre>
<p className="it">La función media es un ejemplo de lo que se conoce como función variada o variable-arity (la aridad de una función es el número de argumentos que espera): Puede tomar cualquier número de argumentos. En comparación, una versión de arity fija de promedio probablemente tomaría un argumento único que contenga una matriz de valores:</p>

<p className="p">The average function is an example of what’s known as a variadic or variable-arity function (the arity of a function is the number of arguments it expects): It can take any number of arguments. By comparison, a fixed-arity version of average would probably take a single argument containing an array of values:</p>
<pre><code>averageOfArray([1, 2, 3]);	// 2<br></br>
averageOfArray([1]);	// 1<br></br>
averageOfArray([3, 1, 4, 1, 5, 9, 2, 6, 5]); // 4<br></br>
averageOfArray([2, 7, 1, 8, 2, 8, 1, 8]); // 4.625</code></pre>
<p className="it">La versión variadica es más concisa y posiblemente más elegante. Las funciones Variadic tienen una sintaxis conveniente, al menos cuando el llamador sabe de antemano cuántos argumentos ofrecer, como en los ejemplos anteriores. Pero imaginemos que tenemos una serie de valores:</p>

<p className="p">The variadic version is more concise and arguably more elegant. Variadic functions have convenient syntax, at least when the caller knows ahead of time exactly how many arguments to provide, as in the examples above. But imagine that we have an array of values:</p>
<pre><code>var scores = getAllScores();</code></pre>
<p className="it">¿Cómo podemos utilizar la función promedio para calcular su promedio?</p>

<p className="p">How can we use the average function to compute their average?</p>
<pre><code>average(/ ?	/);</code></pre>
<p className="it">Afortunadamente, las funciones vienen con un método de aplicación incorporado, que es similar a su método de llamada, pero diseñado sólo para este propósito. El método apply toma una matriz de argumentos y llama a la función como si cada elemento de la matriz fuera un argumento individual de la llamada. Además de la matriz de argumentos, el método apply toma un primer argumento que especifica la vinculación de esto para la función que se está llamando. Dado que la función media no se refiere a esto, simplemente podemos pasarla null:</p>

<p className="p">Fortunately, functions come with a built-in apply method, which is similar to their call method, but designed just for this purpose. The apply method takes an array of arguments and calls the function as if each element of the array were an individual argument of the call. In addition to the array of arguments, the apply method takes a first argument that specifies the binding of this for the function being called. Since the average function does not refer to this, we can simply pass it null:</p>
<pre><code>var scores = getAllScores(); average.apply(null, scores);</code></pre>
<p className="it">Si los resultados resultan tener, digamos, tres elementos, esto se comportará igual que si hubiéramos escrito:</p>

<p className="p">If scores turns out to have, say, three elements, this will behave the same as if we had written:</p>
<pre><code>average(scores[0], scores[1], scores[2]);</code></pre>
<p className="it">El método de aplicación se puede utilizar también en los métodos variádicos. Por ejemplo, un objeto de memoria intermedia puede contener un método variadic append para agregar entradas a su estado interno (vea el ítem 22 para entender la implementación de append):</p>

<p className="p">The apply method can be used on variadic methods, too. For example, a buffer object might contain a variadic append method for adding entries to its internal state (see Item 22 to understand the implementation of append):</p>
<pre><code>var buffer = &#123; state: [],<br></br>
append: function() &#123;<br></br>
for (var i = 0, n = arguments.length; i &#60; n; i++) &#123;<br></br>
this.state.push(arguments[i]);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">El método append puede ser llamado con cualquier número de argumentos:</p>

<p className="p">The append method can be called with any number of arguments:</p>
<pre><code>
buffer.append("Hello, "); buffer.append(firstName, " ", lastName, "!"); buffer.append(newline);</code></pre>
<p className="it">Con el argumento this of apply, también podemos llamar append con una matriz calculada:</p>

<p className="p">With the this argument of apply, we can also call append with a computed array:</p>
<pre><code>buffer.append.apply(buffer, getInputStrings());</code></pre>
<p className="it">Observe la importancia del argumento del búfer: Si pasamos un objeto diferente, el método append intentaría modificar la propiedad state del objeto incorrecto.</p>

<p className="p">Notice the importance of the buffer argument: If we passed a different object, the append method would attempt to modify the state property of the wrong object.</p>
<h3> Things to Remember</h3> 
<p className="it">Utilice el método apply para llamar a las funciones variadicas con una matriz computada de argumentos.</p>

<p className="p">Use the apply method to call variadic functions with a computed array of arguments.</p>
<p className="it">Utilice el primer argumento de aplicar para proporcionar un receptor para los métodos variádicos.</p>

<p className="p">Use the first argument of apply to provide a receiver for variadic methods.</p>

<h3> Item 22: Use arguments to Create Variadic Functions</h3> 
<p className="it">El ítem 21 describe una función media variádica, que puede procesar un número arbitrario de argumentos y producir su valor promedio. ¿Cómo podemos implementar una función variadica propia? La versión de arity fija, averageOfArray, es bastante fácil de implementar:</p>

<p className="p">Item 21 describes a variadic average function, which can process an arbitrary number of arguments and produce their average value. How can we implement a variadic function of our own? The fixed-arity version, averageOfArray, is easy enough to implement:</p> 
<pre><code> function averageOfArray(a) &#123;<br></br>
for (var i = 0, sum = 0, n = a.length; i &#60; n; i++) &#123; sum += a[i];<br></br>
&#125;<br></br>
return sum / n;<br></br>
&#125;<br></br>
averageOfArray([2, 7, 1, 8, 2, 8, 1, 8]); // 4.625</code></pre>
<p className="it">La definición de averageOfArray define un solo parámetro formal, la variable a en la lista de parámetros. Cuando los consumidores llaman averageOfArray, proporcionan un solo argumento (a veces llamado un argumento real para distinguirlo claramente del parámetro formal), la matriz de valores.</p>

<p className="p">The definition of averageOfArray defines a single formal parameter, the variable a in the parameter list. When consumers call averageOfArray, they provide a single argument (sometimes called an actual argument to distinguish it clearly from the formal parameter), the array of values.</p>
<p className="it">La versión variadica es casi idéntica, pero no define ningún parámetro formal explícito. En su lugar, hace uso del hecho de que JavaScript proporciona a cada función una variable local implícita llamada argumentos. El objeto arguments proporciona una interfaz tipo array a los argumentos reales: contiene propiedades indexadas para cada argumento real y una propiedad length que indica cuántos argumentos se proporcionaron. Esto hace que la función promedio de la variable-aridad sea expresable haciendo un bucle sobre cada elemento del objeto de los argumentos:</p>

<p className="p">The variadic version is almost identical, but it does not define any explicit formal parameters. Instead, it makes use of the fact that JavaScript provides every function with an implicit local variable called arguments. The arguments object provides an array-like interface to the actual arguments: It contains indexed properties for each actual argument and a length property indicating how many arguments were provided. This makes the variable-arity average function expressible by looping over each element of the arguments object:</p>
<pre><code>function average() &#123;<br></br>
for (var i = 0, sum = 0, n = arguments.length; i &#60; n;<br></br>
i++) &#123;<br></br>
sum += arguments[i];<br></br>
&#125;<br></br>
return sum / n;<br></br>
&#125;</code></pre>

<p className="it">Funciones Variadic hacen para interfaces flexibles; Diferentes clientes pueden llamarlos con diferentes números de argumentos. Pero por sí mismos, también pierden un poco de comodidad: si los consumidores quieren llamarlos con una matriz computada de argumentos, tienen que usar el método de aplicación descrito en el punto 21. Una buena regla general es que siempre que proporcione una variable- Arity función por conveniencia, también debe proporcionar una versión de arity fija que toma una matriz explícita. Esto suele ser fácil de proporcionar, ya que normalmente se puede implementar la función variadic como un envoltorio pequeño que delega a la versión de arity fijo:</p>

<p className="p">Variadic functions make for flexible interfaces; different clients can call them with different numbers of arguments. But by themselves, they also lose a bit of convenience: If consumers want to call them with a computed array of arguments, they have to use the apply method described in Item 21. A good rule of thumb is that whenever you provide a variable-arity function for convenience, you should also provide a fixed-arity version that takes an explicit array. This is usually easy to provide, because you can typically implement the variadic function as a small wrapper that delegates to the fixed-arity version:</p> 
<pre><code>function average() &#123;<br></br>
return averageOfArray(arguments);<br></br>
&#125;</code></pre>
<p className="it">De esta manera, los consumidores de sus funciones no tienen que recurrir al método de aplicación, que puede ser menos legible ya menudo conlleva un costo de rendimiento.</p>

<p className="p">This way, consumers of your functions don’t have to resort to the apply method, which can be less readable and often carries a performance cost.</p>

<h3> Things to Remember</h3> 
<p className="it">Utilice el objeto de argumentos implícitos para implementar funciones de variable-arity.</p>

<p className="p">Use the implicit arguments object to implement variable-arity functions.</p>
<p className="it">Considere la posibilidad de proporcionar versiones fijas adicionales de las funciones variadicas que proporciona para que sus consumidores no necesiten usar el método apply.</p>

<p className="p">Consider providing additional fixed-arity versions of the variadic functions you provide so that your consumers don’t need to use the apply method.</p>

<h3> Item 23: Never Modify the arguments Object</h3> 
<p className="it">El objeto arguments puede parecer un array, pero tristemente no siempre se comporta como uno. Los programadores familiarizados con los scripts de shell de Perl y UNIX están acostumbrados a la técnica de "desplazar" elementos fuera del comienzo de una matriz de argumentos. Y las matrices de JavaScript de hecho contienen un método de cambio, que elimina el primer elemento de una matriz y cambia todos los elementos subsiguientes por uno. Pero el objeto argumentos en sí no es una instancia del tipo <code>Array</code> estándar, por lo que no podemos llamar directamente <code>arguments.shift()</code>.</p>

<p className="p">The arguments object may look like an array, but sadly it does not always behave like one. Programmers familiar with Perl and UNIX shell scripting are accustomed to the technique of “shifting” elements off of the beginning of an array of arguments. And JavaScript’s arrays do in fact contain a shift method, which removes the first element of an array and shifts all the subsequent elements over by one. But the arguments object itself is not an instance of the standard <code>Array</code> type, so we cannot directly call <code>arguments.shift()</code>.</p>
<p className="it">Gracias al método de llamada, puede esperar ser capaz de extraer el método de cambio de una matriz y llamarla en el objeto argumentos. Esto puede parecer una forma razonable de implementar una función como callMethod, que toma un objeto y un nombre de método e intenta llamar al método del objeto en todos los argumentos restantes:</p>

<p className="p">Thanks to the call method, you might expect to be able to extract the shift method from an array and call it on the arguments object. This might seem like a reasonable way to implement a function such as callMethod, which takes an object and a method name and attempts to call the object’s method on all the remaining arguments:</p>
<pre><code>function callMethod(obj, method) &#123; var shift = [].shift; shift.call(arguments); shift.call(arguments);<br></br>
return obj[method].apply(obj, arguments);<br></br>
&#125;</code></pre>
<p className="it">Pero esta función no se comporta ni remotamente como se esperaba:</p>

<p className="p">But this function does not behave even remotely as expected:</p>
<pre><code>var obj = &#123;<br></br>
add: function(x, y) &#123; return x + y; &#125;<br></br>
&#125;;<br></br>
callMethod(obj, "add", 17, 25);<br></br>
// error: cannot read property "apply" of undefined</code></pre>
<p className="it">La razón por la que esto falla es que el argumento object no es una copia de los argumentos de la función. En particular, todos los argumentos nombrados son alias de sus índices correspondientes en el objeto arguments. Así que obj sigue siendo un alias para argumentos [0] y método para argumentos [1], incluso después de quitar elementos del objeto argumentos a través de cambio. Esto significa que mientras que aparentemente estamos extrayendo obj ["add"], estamos realmente extrayendo 17 [25]! Gracias a las reglas de coerción automáticas de JavaScript, esto promueve 17 a un objeto Número, extrae su propiedad "25" (que no existe), produce indefinido y luego intenta sin éxito extraer el "Apply" propiedad de undefined para llamarlo como un método.</p>

<p className="p">The reason why this fails is that the arguments object is not a copy  of the function’s arguments. In particular, all named arguments are aliases to their corresponding indices in the arguments object. So obj continues to be an alias for arguments[0] and method for arguments[1], even after we remove elements from the arguments object via shift. This means that while we appear to be extracting obj["add"], we are actually extracting 17[25]! At this point, everything begins to go haywire: Thanks to the automatic coercion rules of JavaScript, this promotes 17 to a Number object, extracts its "25" property (which does not exist), produces undefined, and then unsuccessfully attempts to extract the "apply" property of undefined to call it as a method.</p>
<p className="it">La moraleja de esta historia es que la relación entre el objeto argumentos y los parámetros nombrados de una función es extremadamente frágil. La modificación de argumentos corre el riesgo de convertir los parámetros nombrados de una función en jerigonza. La situación se complica aún más por el modo estricto de ES5. Parámetros de función en modo estricto no alias sus argumentos objeto. Podemos demostrar la diferencia escribiendo una función que actualiza un elemento de argumentos:</p>

<p className="p">The moral of this story is that the relationship between the arguments object and the named parameters of a function is extremely brittle. Modifying arguments runs the risk of turning the named parameters of a function into gibberish. The situation is complicated even further by ES5’s strict mode. Function parameters in strict mode do not alias their arguments object. We can demonstrate the difference by writing a function that updates an element of arguments:</p>
<pre><code>function strict(x) &#123; "use strict";<br></br>
arguments[0] = "modified";<br></br>
return x === arguments[0];<br></br>
&#125;<br></br>
function nonstrict(x) &#123; arguments[0] = "modified"; return x === arguments[0];<br></br>
&#125;<br></br>
strict("unmodified");	// false<br></br>
nonstrict("unmodified"); // true</code></pre>
<p className="it">Como consecuencia, es mucho más seguro nunca modificar el objeto argumentos. Esto es bastante fácil de evitar copiando primero sus elementos en una matriz real. Un simple lenguaje para implementar la copia es:</p>

<p className="p">As a consequence, it is much safer never to modify the arguments object. This is easy enough to avoid by first copying its elements to a real array. A simple idiom for implementing the copy is:</p>
<pre><code>
var args = [].slice.call(arguments);</code></pre>
<p className="it">El método slice de arrays hace una copia de una matriz cuando se llama sin argumentos adicionales, y su resultado es una instancia verdadera del tipo <code>Array</code> estándar. El resultado está garantizado para no alias nada, y tiene todos los métodos normales <code>Array</code> disponibles para él directamente.</p>

<p className="p">The slice method of arrays makes a copy of an array when called without additional arguments, and its result is a true instance of the standard <code>Array</code> type. The result is guaranteed not to alias anything, and has all the normal <code>Array</code> methods available to it directly.</p>
<p className="it">Podemos arreglar la implementación callMethod copiando argumentos, y como sólo necesitamos los elementos después de obj y method, podemos pasar un índice inicial de 2 a slice:</p>

<p className="p">We can fix the callMethod implementation by copying arguments, and since we only need the elements after obj and method, we can pass a starting index of 2 to slice:</p>
<pre><code>function callMethod(obj, method) &#123;<br></br>
var args = [].slice.call(arguments, 2);<br></br>
return obj[method].apply(obj, args);<br></br>
&#125;
</code></pre>
<p className="it">Por último, callMethod funciona como se esperaba:</p>

<p className="p">At last, callMethod works as expected:</p>
<pre><code>
var obj = &#123;<br></br>
add: function(x, y) &#123; return x + y; &#125;<br></br>
&#125;;<br></br>
callMethod(obj, "add", 17, 25); // 42<br></br>
</code></pre>
<h3> Things to Remember</h3> 
<p className="it">Nunca modifique el objeto argumentos.</p>

<p className="p">Never modify the arguments object.</p>
<p className="it">Copie el objeto arguments a una matriz real <code>[].slice.call(arguments)</code>antes de modificarla.</p>

<p className="p">Copy the arguments object to a real array using <code>[].slice.call(arguments)</code> before modifying it.</p>
<h3> Item 24: Use a Variable to Save a Reference to arguments</h3>
<p className="it">Un iterador es un objeto que proporciona acceso secuencial a una colección de datos. Una API típica proporciona un método siguiente que proporciona el siguiente valor en la secuencia. Imagine que deseamos escribir una función de conveniencia que tome un número arbitrario de argumentos y construya un iterador para esos valores:</p>

<p className="p">An iterator is an object providing sequential access to a collection of data. A typical API provides a next method that provides the next value in the sequence. Imagine we wish to write a convenience function that takes an arbitrary number of arguments and builds an iterator for those values:</p>
<pre><code>
var it = values(1, 4, 1, 4, 2, 1, 3, 5, 6);<br></br>
it.next(); // 1<br></br>
it.next(); // 4<br></br>
it.next(); // 1</code></pre>
<p className="it">La función de valores debe aceptar cualquier número de argumentos, por lo que construimos nuestro objeto iterador para iterar sobre los elementos del objeto argumentos:</p>

<p className="p">The values function must accept any number of arguments, so we construct our iterator object to iterate over the elements of the arguments object:</p>
<pre><code>
function values() &#123;<br></br>
var i = 0, n = arguments.length;<br></br>
return &#123;<br></br>
hasNext: function() &#123;<br></br>
return i &#60; n;<br></br>
&#125;,<br></br>
next: function() &#123; if (i &#62;= n) &#123;<br></br>
throw new Error("end of iteration");<br></br>
&#125;<br></br>
return arguments[i++]; // wrong arguments<br></br>
&#125;<br></br>
&#125;;<br></br>
&#125;<br></br>
</code></pre>
<p className="it">Pero este código está roto, que se vuelve claro tan pronto como intentamos usar un objeto iterador:</p>

<p className="p">But this code is broken, which becomes clear as soon as we attempt to use an iterator object:</p>
<pre><code>
var it = values(1, 4, 1, 4, 2, 1, 3, 5, 6); it.next(); // undefined<br></br>
it.next(); // undefined<br></br>
it.next(); // undefined</code></pre>
<p className="it">El problema se debe al hecho de que una nueva variable de argumentos está implícitamente unida en el cuerpo de cada función. El objeto arguments que nos interesa es el asociado con la función values, pero el siguiente método del iterator contiene su propia variable arguments. Así que cuando devuelven argumentos [i ++], estamos accediendo a un argumento de it.next en lugar de uno de los argumentos de los valores.</p>

<p className="p">The problem is due to the fact that a new arguments variable is implicitly bound in the body of each function. The arguments object we are interested in is the one associated with the values function, but the iterator’s next method contains its own arguments variable. So when we return arguments[i++], we are accessing an argument of it.next instead of one of the arguments of values.</p>
<p className="it">La solución es sencilla: Simplemente enlaza una nueva variable local en el ámbito del objeto argumentos que nos interesa y asegúrese de que las funciones anidadas sólo se refieren a esa variable denominada explícitamente:</p>

<p className="p">The solution is straightforward: Simply bind a new local variable in the scope of the arguments object we are interested in, and make sure that nested functions only refer to that explicitly named variable:</p>
<pre><code>
function values() &#123;<br></br>
var i = 0, n = arguments.length, a = arguments;<br></br>
return &#123;<br></br>
hasNext: function() &#123;<br></br>
return i &#60; n;<br></br>
&#125;,<br></br>
next: function() &#123;<br></br>
if (i &#62;= n) &#123;<br></br>
throw new Error("end of iteration");<br></br>
&#125;<br></br>
return a[i++];<br></br>
&#125;<br></br>
&#125;;<br></br>
&#125;<br></br>
var it = values(1, 4, 1, 4, 2, 1, 3, 5, 6);<br></br>
it.next(); // 1<br></br>
it.next(); // 4<br></br>
it.next(); // 1<br></br>
</code></pre>
<h3> Things to Remember</h3> 
<p className="it">Tenga en cuenta el nivel de anidamiento de funciones cuando se refieren a argumentos.</p>

<p className="p">Be aware of the function nesting level when referring to arguments.</p>
<p className="it">Vincule una referencia de ámbito explícito a los argumentos para referirse a ella desde funciones anidadas.</p>

<p className="p">Bind an explicitly scoped reference to arguments in order to refer to it from nested functions.</p>
<h3> Item 25: Use bind to Extract Methods with a Fixed Receiver</h3> 
<p className="it">Sin distinción entre un método y una propiedad cuyo valor es una función, es fácil extraer un método de un objeto y pasar la función extraída directamente como una devolución de llamada a una función de orden superior. Pero también es fácil olvidar que el receptor de una función extraída no está ligado al objeto de donde fue extraído. Imagine un pequeño objeto de búfer de cadena que almacena cadenas en una matriz que se puede concatenar posteriormente:</p>

<p className="p">With no distinction between a method and a property whose value    is a function, it’s easy to extract a method of an object and pass the extracted function directly as a callback to a higher-order function. But it’s also easy to forget that an extracted function’s receiver is not bound to the object it was taken from. Imagine a little string buffer object that stores strings in an array that can be concatenated later:</p>
<pre><code>
var buffer = &#123; entries: [],<br></br>
add: function(s) &#123;<br></br>
this.entries.push(s);<br></br>
&#125;,<br></br>
concat: function() &#123;<br></br>
return this.entries.join("");<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">Puede parecer posible copiar una matriz de cadenas en el búfer extrayendo su método add y llamándolo repetidamente en cada elemento de la matriz de origen usando el método ES5 forEach:</p>

<p className="p">It might seem possible to copy an array of strings into the buffer by extracting its add method and calling it repeatedly on each element of the source array using the ES5 forEach method:</p>
<pre><code>var source = ["867", "-", "5309"]; source.forEach(buffer.add); // error: entries is undefined</code></pre>
<p className="it">Pero el receptor de buffer.add no es buffer. El receptor de una función está determinado por cómo se llama, y ​​no lo llamamos aquí. En su lugar, lo pasamos a forEach, cuya implementación lo llama en algún lugar que no podemos ver. Como resulta, la implementación de forEach utiliza el objeto global como receptor por defecto. Dado que el objeto global no tiene ninguna propiedad de entradas, este código arroja un error. Afortunadamente, forEach también permite que los llamadores proporcionen un argumento opcional para usar como el receptor de su devolución de llamada, por lo que podemos arreglar este ejemplo con bastante facilidad:</p>

<p className="p">But the receiver of buffer.add is not buffer. A function’s receiver is determined by how it is called, and we are not calling it here. Instead, we pass it to forEach, whose implementation calls it somewhere that we can’t see. As it turns out, the implementation of forEach uses the global object as the default receiver. Since the global object has no entries property, this code throws an error. Luckily, forEach also allows callers to provide an optional argument to use as the receiver of its callback, so we can fix this example easily enough:</p>
<pre><code>var source = ["867", "-", "5309"]; source.forEach(buffer.add, buffer); buffer.join(); // "867-5309"</code></pre>
<p className="it">No todas las funciones de orden superior ofrecen a sus clientes la cortesía de proporcionar un receptor para sus devoluciones de llamada. ¿Qué pasa si para cada uno no aceptar el argumento receptor adicional? Una buena solución es crear una función local que se asegure de llamar a buffer.add con la sintaxis de llamada de método apropiado:</p>

<p className="p">Not all higher-order functions offer their clients the courtesy of providing a receiver for their callbacks. What if forEach did not accept the extra receiver argument? A good solution is to create a local function that makes sure to call buffer.add with the appropriate method call syntax:</p>
<pre><code>
var source = ["867", "-", "5309"]; source.forEach(function(s) &#123;<br></br>
buffer.add(s);<br></br>
&#125;);<br></br>
buffer.join(); // "867-5309"</code></pre>
<p className="it">Esta versión crea una función wrapper que llama explícitamente add como un método de búfer. Observe cómo la función de contenedor en sí no se refiere a esto en absoluto. No importa cómo se llama a la función wrapper -como una función, como un método de algún otro objeto, o vía llamada- siempre se asegura de empujar su argumento en la matriz de destino.</p>

<p className="p">This version creates a wrapper function that explicitly calls add as    a method of buffer. Notice how the wrapper function itself does not refer to this at all. No matter how the wrapper function is called—as a function, as a method of some other object, or via call—it always makes sure to push its argument on the destination array.</p>
<p className="it">Crear una versión de una función que enlaza su receptor a un objeto específico es tan común que ES5 agregó soporte de biblioteca para el patrón. Los objetos funcionales vienen con un método bind que toma un objeto receptor y produce una función wrapper que llama a la función original como un método del receptor. Usando bind, podemos simplificar nuestro ejemplo:</p>

<p className="p">Creating a version of a function that binds its receiver to a specific object is so common that ES5 added library support for the pattern. Function objects come with a bind method that takes a receiver object and produces a wrapper function that calls the original function as a method of the receiver. Using bind, we can simplify our example:</p>
<pre><code>var source = ["867", "-", "5309"]; source.forEach(buffer.add.bind(buffer)); buffer.join(); // "867-5309"</code></pre>
<p className="it">Tenga en cuenta que buffer.add.bind (buffer) crea una nueva función en lugar de modificar la función buffer.add. La nueva función se comporta igual que la antigua, pero con su receptor ligado a la memoria intermedia, mientras que la antigua permanece sin cambios. En otras palabras:</p>

<p className="p">Keep in mind that buffer.add.bind(buffer) creates a new function rather than modifying the buffer.add function. The new function behaves just like the old one, but with its receiver bound to buffer, while the old one remains unchanged. In other words:</p>
<pre><code>
buffer.add === buffer.add.bind(buffer); // false</code></pre>
<p className="it">Este es un punto sutil pero crucial: Significa que bind es seguro llamar incluso en una función que puede ser compartida por otras partes de un programa. Es especialmente importante para los métodos compartidos en un prototipo de objeto: El método seguirá funcionando correctamente cuando se llama a cualquiera de los descendientes del prototipo. (Consulte el Capítulo 4 para más información sobre objetos y prototipos.)</p>

<p className="p">This is a subtle but crucial point: It means that bind is safe to call even on a function that may be shared by other parts of a program. It is especially important for methods shared on a prototype object: The method will still work correctly when called on any of the prototype’s descendants. (See Chapter 4 for more on objects and prototypes.)</p>

<h3> Things to Remember</h3> 
<p className="it">Tenga en cuenta que la extracción de un método no vincula el receptor del método a su objeto.</p>

<p className="p">Beware that extracting a method does not bind the method’s receiver to its object.</p>
<p className="it">Al pasar el método de un objeto a una función de orden superior, utilice una función anónima para llamar al método en el receptor apropiado.</p>

<p className="p">When passing an object’s method to a higher-order function, use an anonymous function to call the method on the appropriate receiver.</p>
<p className="it">Utilice bind como una abreviatura para crear una función vinculada al receptor apropiado.</p>

<p className="p">Use bind as a shorthand for creating a function bound to the appropriate receiver.</p>

<h3> Item 26: Use bind to Curry Functions</h3> 
<p className="it">El método de enlace de funciones es útil para más que sólo métodos de enlace a receptores. Imagine una función simple para construir cadenas de URL desde los componentes:</p>

<p className="p">The bind method of functions is useful for more than just binding methods to receivers. Imagine a simple function for constructing URL strings from components:</p>
<pre><code>function simpleURL(protocol, domain, path) &#123;<br></br>
return protocol + "://" + domain + "/" + path;<br></br>
&#125;</code></pre>
<p className="it">Con frecuencia, un programa puede necesitar construir URLs absolutas de cadenas de ruta de acceso específicas del sitio. Una forma natural de hacerlo es con el método de mapa ES5 en matrices:</p>

<p className="p">Frequently, a program may need to construct absolute URLs from site-specific path strings. A natural way to do this is with the ES5 map method on arrays:</p>
<pre><code>var urls = paths.map(function(path) &#123;<br></br>
return simpleURL("http", siteDomain, path);<br></br>
&#125;);</code></pre>
<p className="it">Observe cómo la función anónima utiliza la misma cadena de protocolo y la misma cadena de dominio de sitio en cada iteración de mapa; Los dos primeros argumentos a simpleURL se fijan para cada iteración, y sólo el tercer argumento es necesario. Podemos usar el método bind en simpleURL para construir esta función automáticamente:</p>

<p className="p">Notice how the anonymous function uses the same protocol string and the same site domain string on each iteration of map; the first two arguments to simpleURL are fixed for each iteration, and only the third argument is needed. We can use the bind method on simpleURL to construct this function automatically:</p>
<pre><code>var urls = paths.map(simpleURL.bind(null, "http", siteDomain));
</code></pre>
<p className="it">La llamada a simpleURL.bind produce una nueva función que delega a simpleURL. Como siempre, el primer argumento a enlazar proporciona el valor del receptor. Los argumentos pasados ​​a simpleURL se construyen concatenando los argumentos restantes de simpleURL.bind a cualquier argumento proporcionado a la nueva función. En otras palabras, cuando el resultado de simpleURL.bind se llama con una sola ruta de argumento, la función delega a simpleURL ("http", siteDomain, path).</p>

<p className="p">The call to simpleURL.bind produces a new  function  that  delegates to simpleURL.  As always, the first argument to bind provides  the receiver value. (Since simpleURL does not refer to this, we can use any value; null and undefined are customary.) The arguments passed to simpleURL are constructed by concatenating the remaining arguments of simpleURL.bind to any arguments provided to the new function. In other  words,  when  the  result  of  simpleURL.bind is called with a single argument path, the function delegates to simpleURL("http", siteDomain, path).</p>
<p className="it">La técnica de enlazar una función a un subconjunto de sus argumentos se conoce como currying, que lleva el nombre del lógico Haskell Curry, que popularizó la técnica en matemáticas. El currying puede ser una forma sucinta de implementar la delegación de funciones con menos funciones que las funciones de wrapper explícitas.</p>

<p className="p">The technique of binding a function to a subset of its arguments      is known as currying, named after the logician Haskell Curry, who popularized the technique in mathematics. Currying can be a succinct way to implement function delegation with less boilerplate than explicit wrapper functions.</p>
<h3> Things to Remember</h3> 
<p className="it">Use bind para curry una función, es decir, para crear una función de delegación con un subconjunto fijo de los argumentos requeridos.</p>

<p className="p">Use bind to curry a function, that is, to create a delegating function with a fixed subset of the required arguments.</p>
<p className="it">Pasa nulo o indefinido como el argumento del receptor para curar una función que ignora su receptor.</p>

<p className="p">Pass null or undefined as the receiver argument to curry a function that ignores its receiver.</p>
<h3> Item 27: Prefer Closures to Strings for Encapsulating Code</h3> 
<p className="it">Las funciones son una manera conveniente de almacenar código como una estructura de datos que se puede ejecutar más adelante. Esto permite abstracciones expresivas de orden superior como map y forEach, y es el centro del enfoque asíncrono de JavaScript para E / S (véase el Capítulo 7). Al mismo tiempo, también es posible representar el código como una cadena para pasar a eval. Los programadores se enfrentan entonces a una decisión de hacer: ¿Debería representarse el código como una función o como una cadena?</p>

<p className="p">Functions are a convenient way to store code as a data structure that can be executed later. This enables expressive higher-order abstractions such as map and forEach, and it is at the heart of JavaScript’s asynchronous approach to I/O (see Chapter 7). At the same time, it’s also possible to represent code as a string to pass to eval. Programmers are then confronted with a decision to make: Should code be represented as a function or as a string?</p>
<p className="it">En caso de duda, utilice una función. Las cadenas son una representación mucho menos flexible del código por una razón muy importante: No son cierres.</p>

<p className="p">When in doubt, use a function. Strings are a much less flexible representation of code for one very important reason: They are not closures.</p>
<p className="it">Considere una función simple para repetir una acción proporcionada por el usuario varias veces:</p>

<p className="p">Consider a simple function for repeating a user-provided action multiple times:</p>
<pre><code>
function repeat(n, action) &#123;<br></br>
for (var i = 0; i &#60; n; i++) &#123; eval(action);<br></br>
&#125;<br></br>
&#125;</code></pre>
<p className="it">En el ámbito global, el uso de esta función funcionará razonablemente bien, ya que cualquier referencia a las variables que se produzca dentro de la cadena será interpretada por eval como variables globales. Por ejemplo, una secuencia de comandos que compara la velocidad de una función puede utilizar las variables globales de inicio y fin para almacenar las temporizaciones:</p>

<p className="p">At global scope, using this function will work reasonably well, because any variable references that occur within the string will be interpreted by eval as global variables. For example, a script that benchmarks the speed of a function might just use global start and end variables to store the timings:</p>
<pre><code>var start = [], end = [], timings = []; repeat(1000,<br></br>
"start.push(Date.now()); f(); end.push(Date.now())");<br></br>
for (var i = 0, n = start.length; i &#60; n; i++) &#123; timings[i] = end[i] - start[i];<br></br>
&#125;
</code></pre>
<p className="it">Pero este guión es frágil. Si simplemente trasladamos el código a una función, entonces el inicio y el fin ya no son variables globales:</p>

<p className="p">But this script is brittle. If we simply move the code into a function, then start and end are no longer global variables:</p>
<pre><code>
function benchmark() &#123;<br></br>
var start = [], end = [], timings = []; repeat(1000,<br></br>
"start.push(Date.now()); f(); end.push(Date.now())");<br></br>
for (var i = 0, n = start.length; i &#60; n; i++) &#123; timings[i] = end[i] - start[i];<br></br>
&#125;<br></br>
return timings;<br></br>
&#125;
</code></pre>
<p className="it">Esta función hace que la repetición evalúe referencias a las variables globales de inicio y fin. En el mejor de los casos, uno de los globales se perderá, y el punto de referencia de llamada lanzará un ReferenceError. Si realmente no tenemos suerte, el código realmente llamará a empujar a algunos objetos globales que están destinados a comenzar y terminar, y el programa se comportará de manera impredecible.</p>

<p className="p">This function causes repeat to evaluate references to the global variables start and end. In the best case, one of the globals will be missing, and calling benchmark will throw a ReferenceError. If we’re really unlucky, the code will actually call push on some global objects that happen to be bound to start and end, and the program will behave unpredictably.</p>
<p className="it">Un API más robusto acepta una función en lugar de una cadena:</p>

<p className="p">A more robust API accepts a function instead of a string:</p>
<pre><code>
function repeat(n, action) &#123;<br></br>
for (var i = 0; i &#60; n; i++) &#123; action();<br></br>
&#125;<br></br>
&#125;<br></br>
</code></pre>
<p className="it">De esta manera, el script de referencia puede referirse sin problemas a variables locales dentro de un cierre que pasa como la devolución de llamada repetida:</p>

<p className="p">This way, the benchmark script can safely refer to local variables within a closure that it passes as the repeated callback:</p>
<pre><code>
function benchmark() &#123;<br></br>
var start = [], end = [], timings = []; repeat(1000, function() &#123;<br></br>
start.push(Date.now()); f();<br></br>
end.push(Date.now());<br></br>
&#125;);<br></br>
for (var i = 0, n = start.length; i &#60; n; i++) &#123; timings[i] = end[i] - start[i];<br></br>
&#125;<br></br>
return timings;<br></br>
&#125;
</code></pre>
<p className="it">Otro problema con eval es que los motores de alto rendimiento suelen tener un tiempo más difícil optimizar el código dentro de una cadena, ya que el código fuente puede no estar disponible para el compilador lo suficientemente temprano para optimizar en el tiempo. Una expresión de función se puede compilar al mismo tiempo que el código que aparece dentro, haciéndolo mucho más susceptible a la compilación estándar.</p>

<p className="p">Another problem with eval is that high-performance engines typically have a harder time optimizing code inside a string, since the source code may not be available to the compiler early enough to optimize in time. A function expression can be compiled at the same time as the code it appears within, making it much more amenable to standard compilation.</p>
<h3> Things to Remember</h3> 
<p className="it">Nunca incluya referencias locales en cadenas al enviarlas a API que las ejecuten con eval.</p>

<p className="p">Never include local references in strings when sending them to APIs that execute them with eval.</p>
<p className="it">Prefieren las API que aceptan funciones para llamar en lugar de cadenas a eval.</p>

<p className="p">Prefer APIs that accept functions to call rather than strings to eval.</p>
<h3> Item 28: Avoid Relying on the toString Method of Functions</h3> 
<p className="it">Las funciones de JavaScript vienen con una característica notable: la capacidad de reproducir su código fuente como una cadena:</p>

<p className="p">JavaScript functions come with a remarkable feature—the ability to reproduce their source code as a string:</p>
<pre><code>
(function(x) &#123;<br></br>
return x + 1;<br></br>
&#125;).toString(); // "function (x) &#123;\n	return x + 1;\n&#125;"
</code></pre>
<p className="it">Reflexionar sobre el código fuente de una función es poderoso, y los hackers inteligentes de vez en cuando encuentran maneras ingeniosas de ponerlo en uso. Pero hay serias limitaciones al método toString de funciones.</p>

<p className="p">Reflecting on the source code of a function is powerful, and clever hackers occasionally find ingenious ways to put it to use. But there are serious limitations to the toString method of functions.</p>
<p className="it">En primer lugar, el estándar ECMAScript no impone ningún requisito en la cadena que resulta del método toString de una función. Esto significa que los diferentes motores de JavaScript producirán diferentes cadenas, y ni siquiera pueden producir cadenas que tengan semejanza alguna con la función.</p>

<p className="p">First of all, the ECMAScript standard does not impose any requirements on the string that results from a function’s toString method. This means that different JavaScript engines will produce different strings, and may not even produce strings that bear any resemblance to the function.</p>
<p className="it">En la práctica, los motores de JavaScript intentan proporcionar una representación fiel del código fuente de una función, siempre y cuando la función se haya implementado en JavaScript puro. Un ejemplo de dónde falla es con funciones producidas por bibliotecas integradas del entorno de host:</p>

<p className="p">In practice, JavaScript engines do attempt to provide a faithful representation of the source code of a function, as long as the function was implemented in pure JavaScript. An example of where this fails is with functions produced by built-in libraries of the host environment:</p>
<pre><code>
(function(x) &#123;<br></br>
return x + 1;<br></br>
&#125;).bind(16).toString(); // "function (x) &#123;\n	[native code]\n&#125;"
</code></pre>
<p className="it">Dado que en muchos entornos de host, la función bind se implementa en otro lenguaje de programación (normalmente C ++), produce una función compilada que no tiene código fuente JavaScript para que el entorno pueda revelarse.</p>

<p className="p">Since in many host environments, the bind function is implemented in another programming language (typically C++), it produces a compiled function that has no JavaScript source code for the environment to reveal.</p>
<p className="it">Debido a que los motores de búsqueda están permitidos por el estándar para variar en su salida de toString, es demasiado fácil escribir un programa que funcione correctamente en un sistema JavaScript pero falla en otro. Las implementaciones de JavaScript incluso realizarán pequeños cambios (por ejemplo, el formato de espacios en blanco) que podrían romper un programa demasiado sensible a los detalles exactos de las cadenas de fuentes de funciones.</p>

<p className="p">Because browser engines are allowed by the standard to vary in their output from toString, it is all too easy to write a program that works correctly in one JavaScript system but fails in another. JavaScript implementations will even make small changes (e.g., the whitespace formatting) that could break a program that is too sensitive to the exact details of function source strings.</p>
<p className="it">Finalmente, el código fuente producido por toString no proporciona una representación de cierres que conserva los valores asociados con sus referencias de variables internas. Por ejemplo:</p>

<p className="p">Finally, the source code produced by toString does not provide a representation of closures that preserves the values associated with their inner variable references. For example:</p>
<pre><code>(function(x) &#123;<br></br>
return function(y) &#123;<br></br>
return x + y;<br></br>
&#125;<br></br>
&#125;)(42).toString(); // "function (y) &#123;\n	return x + y;\n&#125;"
</code></pre>
<p className="it">Observe cómo la cadena resultante contiene todavía una referencia variable a x, aunque la función es realmente un cierre que une x a 42.</p>

<p className="p">Notice how the resultant string still contains a variable reference to x, even though the function is actually a closure that binds x to 42.</p>
<p className="it">Estas limitaciones hacen que sea difícil depender de la fuente de la función de extracción de una manera que sea a la vez útil y fiable y, por lo general, debe evitarse. Los usos muy sofisticados de la extracción de fuentes de funciones deberían emplear analizadores JavaScript y librerías de procesamiento cuidadosamente elaborados. Pero en caso de duda, es más seguro tratar una función JavaScript como una abstracción que no se debe romper.</p>

<p className="p">These limitations make it difficult to depend on extracting function source in a manner that is both useful and reliable, and should generally be avoided. Very sophisticated uses of function source extraction should employ carefully crafted JavaScript parsers and processing libraries. But when in doubt, it’s safest to treat a JavaScript function as an abstraction that should not be broken.</p>
<h3> Things to Remember</h3> 
<p className="it">Los motores JavaScript no están obligados a producir reflejos precisos del código fuente de la función a través de toString.</p>

<p className="p">JavaScript engines are not required to produce accurate reflections of function source code via toString.</p>
<p className="it">Nunca confíe en detalles precisos de la fuente de la función, puesto que los diversos motores pueden producir diversos resultados de toString.</p>

<p className="p">Never rely on precise details of function source, since different engines may produce different results from toString.</p>
<p className="it">Los resultados de toString no exponen los valores de las variables locales almacenadas en un cierre.</p>

<p className="p">The results of toString do not expose the values of local variables stored in a closure.</p>
<p className="it">En general, evite usar toString en funciones.</p>

<p className="p">In general, avoid using toString on functions.</p>
<h3> Item 29: Avoid Nonstandard Stack Inspection Properties</h3> 
<p className="it">Muchos entornos de JavaScript han proporcionado históricamente algunas capacidades para inspeccionar la pila de llamadas: la cadena de funciones activas que se están ejecutando actualmente (consulte el Artículo 64 para más información sobre la pila de llamadas). En algunos entornos de host más antiguos, cada objeto de argumentos viene con dos propiedades adicionales:, <code>arguments.caller</code>que se refiere a la función que se llamó con argumentos, y <code>arguments.caller</code>, que se refiere a la función que lo llamó. El primero sigue siendo soportado en muchos entornos, pero no sirve mucho de propósito, a no ser que las funciones anónimas se refieran a sí mismas recursivamente:</p>

<p className="p">Many JavaScript environments have historically provided some capabilities to inspect the call stack: the chain of active functions that are currently executing (see Item 64 for more about the call stack). In some older host environments, every arguments object came with two additional properties: <code>arguments.caller</code>, which refers to the function that was called with arguments, and <code>arguments.caller</code>, which refers to the function that called it. The former is still supported in many environments, but it does not serve much of a purpose, short of allowing anonymous functions to refer to themselves recursively:</p>
<pre><code>
var factorial = (function(n) &#123;<br></br>
 return (n &#60;= 1) ? 1 : (n	arguments.callee(n - 1));<br></br>
&#125;);
</code></pre>
<p className="it">Pero esto no es particularmente útil, ya que es más sencillo para una función simplemente referirse a sí mismo por su nombre:</p>

<p className="p">But this is not particularly useful, since it’s more straightforward for a function just to refer to itself by name:</p>
<pre><code>
function factorial(n) &#123;<br></br>
 return (n &#60;= 1) ? 1 : (n	factorial(n - 1));<br></br>
&#125;
</code></pre>
<p className="it">La <code>arguments.caller</code>propiedad es más potente: Se refiere a la función que realizó la llamada con el objeto argumentos dado. Esta característica se ha eliminado desde la mayoría de los entornos por cuestiones de seguridad, por lo que no es fiable. Muchos entornos de JavaScript también proporcionan una propiedad similar de objetos de función: la propiedad de llamada no estándar, pero extendida, que se refiere al llamador más reciente de la función:</p>

<p className="p">The <code>arguments.caller</code> property is more powerful: It refers to the function that made the call with the given arguments object. This feature has since been removed from most environments out of security concerns, so it’s not reliable. Many JavaScript environments also provide a similar property of function objects—the nonstandard but widespread caller property, which refers to the function’s most recent caller:</p>
<pre><code>
function revealCaller() &#123;<br></br>
return revealCaller.caller;<br></br>
&#125;<br></br>function start() &#123;<br></br>
return revealCaller();<br></br>
&#125;<br></br>
start() === start; // true</code></pre>
<p className="it">Es tentador intentar usar esta propiedad para extraer un rastreo de pila: una estructura de datos que proporciona una instantánea de la pila de llamadas actual. La construcción de un rastro de pila parece engañosamente simple:</p>

<p className="p">It is tempting to try to use this property to extract a stack trace: a data structure providing a snapshot of the current call stack. Building a stack trace seems deceptively simple:</p>
<pre><code>
function getCallStack() &#123;<br></br>
var stack = [];<br></br>
for (var f = getCallStack.caller; f; f = f.caller) &#123; stack.push(f);<br></br>
&#125;<br></br>
return stack;<br></br>
&#125;
</code></pre>
<p className="it">Para pilas de llamadas simples, getCallStack parece funcionar correctamente:</p>

<p className="p">For simple call stacks, getCallStack appears to work fine:</p>
<pre><code>
function f1() &#123;<br></br>
return getCallStack();<br></br>
&#125;<br></br>function f2() &#123;<br></br>
return f1();<br></br>
&#125;<br></br>
var trace = f2(); trace; // [f1, f2]
</code></pre>
<p className="it">Pero getCallStack se rompe fácilmente: Si una función se muestra más de una vez en la pila de llamadas, la lógica de inspección de pila se queda atascada en un bucle!</p>

<p className="p">But getCallStack is easily broken: If a function shows up more than once in the call stack, the stack inspection logic gets stuck in a loop!</p>
<pre><code>
function f(n) &#123;<br></br>
return n === 0 ? getCallStack() : f(n - 1);<br></br>
&#125;<br></br>
var trace = f(1); // infinite loop
</code></pre>
<p className="it">¿Qué salió mal? Dado que la función f se llama a sí misma recursivamente, su propiedad llamante se actualiza automáticamente para referirse de nuevo a f. Así que el bucle en getCallStack se queda atascado perpetuamente mirando f. Incluso si intentamos detectar tales ciclos, no hay información sobre qué función llamó f antes de que se llamara a sí misma: se pierde la información sobre el resto de la pila de llamadas.</p>

<p className="p">What went wrong? Since the function f calls itself recursively, its caller property is automatically updated to refer back to f. So the loop in getCallStack gets stuck perpetually looking at f. Even if we tried to detect such cycles, there’s no information about what function called f before it called itself—the information about the rest of the call stack is lost.</p>
<p className="it">Cada una de estas instalaciones de inspección de pila no es estándar y limitada en portabilidad o aplicabilidad. Además, todos ellos están explícitamente desautorizados en las funciones estrictas de ES5; Los intentos de acceso a las propiedades caller o callee de funciones estrictas o argumentos objectos arrojan un error:</p>

<p className="p">Each of these stack inspection facilities is nonstandard and limited in portability or applicability. Moreover, they are all explicitly disallowed in ES5 strict functions; attempted accesses to the caller or callee properties of strict functions or arguments objects throw an error:</p>
<pre><code>
function f() &#123; "use strict";<br></br>
return f.caller;<br></br>
&#125;<br></br>
f(); // error: caller may not be accessed on strict functions
</code></pre>
<p className="it">La mejor política es evitar la inspección de la chimenea por completo. Si su motivo para inspeccionar la pila es únicamente para la depuración, es mucho más fiable utilizar un depurador interactivo.</p>

<p className="p">The best policy is to avoid stack inspection altogether. If your reason for inspecting the stack is solely for debugging, it’s much more reliable to use an interactive debugger.</p>
<h3> Things to Remember</h3> 
<p className="it">Evitar el no estándar <code>arguments.caller</code>y <code>arguments.callee</code>, porque no son fiablemente portátiles.</p>

<p className="p">Avoid the nonstandard <code>arguments.caller</code> and <code>arguments.callee</code>, because they are not reliably portable.</p>
<p className="it">Evite la propiedad de las funciones no estándar de la persona que llama, ya que no contiene de forma fiable información completa sobre la pila.</p>

<p className="p">Avoid the nonstandard caller property of functions, because it does not reliably contain complete information about the stack.</p>
</div>
</div>
  </Layout>
)
