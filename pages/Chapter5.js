import Layout from '../components/layout'

export default () => (
  <Layout title='Chapter 5'>
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
<p className="chapter">5</p>
<h1>Arrays and Dictionaries</h1>
<p className="it">Los objetos son la estructura de datos más versátil de JavaScript. Dependiendo de la situación, un objeto puede representar un registro fijo de asociaciones nombre-valor, una abstracción de datos orientada a objetos con métodos heredados, una matriz densa o escasa o una tabla hash. Naturalmente, dominar tal herramienta multiusos exige diversos idiomes para diversas necesidades. En el capítulo anterior estudiamos el uso de objetos estructurados y la herencia. Este capítulo aborda el uso de objetos como colecciones: agrega estructuras de datos con un número variable de elementos.</p>
<p className="p">Objects are JavaScript’s most versatile data structure. Depending on the situation, an object can represent a fixed record of name-value associations, an object-oriented data abstraction with inherited methods, a dense or sparse array, or a hash table. Naturally, mastering such a multipurpose tool demands different idioms for different needs. In the preceding chapter we studied the use of structured objects and inheritance. This chapter tackles the use of objects as collections: aggregate data structures with varying numbers of elements.</p>
<h3>Item 43: Build Lightweight Dictionaries from Direct Instances of Object</h3>
<p className="it">En su centro, un objeto JavaScript es una tabla que asigna nombres de propiedad de cadena a valores. Esto hace que los objetos sean ligeramente más ligeros para la implementación de diccionarios: colecciones de tamaño variable que asignan cadenas a valores. JavaScript incluso proporciona una construcción conveniente para enumerar los nombres de propiedad de un objeto, el for ... in loop:</p>
<p className="p">At its heart, a JavaScript object is a table mapping string property names to values. This makes objects pleasantly lightweight for implementing dictionaries: variable-sized collections mapping strings to values. JavaScript even provides a convenient construct for enumerating the property names of an object, the for...in loop:</p>
<pre><code>var dict = &#123; alice: 34, bob: 24, chris: 62 &#125;;<br></br>
var people = [];<br></br>
<br></br>
for (var name in dict) &#123;<br></br>
people.push(name + ": " + dict[name]);<br></br>
&#125;<br></br>
<br></br>
people; // ["alice: 34", "bob: 24", "chris: 62"]</code></pre>
<p className="it">Pero cada objeto también hereda propiedades de su objeto prototipo (véase el capítulo 4), y el bucle for ... en enumera las propiedades heredadas de un objeto, así como sus propiedades "propias". Por ejemplo, ¿qué sucede si creamos una clase de diccionario personalizada que almacena sus elementos como propiedades del propio objeto de diccionario?</p>
<p className="p">But every object also inherits properties from its prototype object  (see Chapter 4), and the for...in loop enumerates an object’s inherited properties as well as its “own” properties. For example, what happens if we create a custom dictionary class that stores its elements as properties of the dictionary object itself?</p>
<pre><code>function NaiveDict() &#123; &#125;<br></br>
<br></br>
NaiveDict.prototype.count = function() &#123;<br></br>
var i = 0;<br></br>
for (var name in this) &#123; // counts every property<br></br>
i++;<br></br>
&#125;<br></br>
return i;<br></br>
&#125;;<br></br>
<br></br>
NaiveDict.prototype.toString = function() &#123;<br></br>
return "[object NaiveDict]";<br></br>
&#125;;<br></br>
var dict = new NaiveDict(); dict.alice = 34;<br></br>
dict.bob = 24;<br></br>
dict.chris = 62;<br></br>
<br></br>
dict.count(); // 5</code></pre>
<p className="it">El problema es que estamos utilizando el mismo objeto para almacenar las propiedades fijas de la estructura de datos <code>NaiveDict</code> (count, toString) y las entradas de variables del diccionario específico (alice, bob, chris). Así que cuando count enumera las propiedades de un diccionario, cuenta todas estas propiedades (count, toString, alice, bob, chris) en lugar de sólo las entradas que nos interesan. Vea el ítem 45 para una clase Dict mejorada que no almacena sus elementos como propiedades de instancia, proporcionando los métodos dict.get (key) y dict.set (key, value). En este ítem nos centramos en el patrón de uso de las propiedades del objeto como elementos del diccionario.</p>
<p className="p">The problem is that we are using the same object to store both the fixed properties of the <code>NaiveDict</code> data structure (count, toString) and the variable entries of the specific dictionary (alice, bob, chris). So when count enumerates the properties of a dictionary, it counts all  of these properties (count, toString, alice, bob, chris) instead of just the entries we care about. See Item 45 for an improved Dict class that does not store its elements as instance properties, instead provid ing dict.get(key) and dict.set(key, value) methods. In this Item we focus on the pattern of using object properties as dictionary elements.</p>
<p className="it">Un error similar es usar el tipo <code>Array</code> para representar diccionarios. Esta es una trampa especialmente fácil de caer en la familia de programadores con lenguajes como Perl y PHP, donde los diccionarios son comúnmente llamados "arrays asociativos". Engañosamente, ya que podemos agregar propiedades a cualquier tipo de objeto JavaScript este patrón de uso a veces aparecerá trabajar:</p>
<p className="p">A similar mistake is to use the <code>Array</code> type to represent dictionaries. This is an especially easy trap to fall into for programmers familiar with languages such as Perl and PHP, where dictionaries are commonly called “associative arrays.” Deceptively, since we can add properties to any type of JavaScript object this usage pattern will sometimes appear to work:</p>
<pre><code>var dict = new Array();<br></br>
<br></br>
dict.alice = 34;<br></br>
dict.bob = 24;<br></br>
dict.chris = 62;<br></br>
<br></br>
dict.bob; // 24</code></pre>
<p className="it">Desafortunadamente, este código es vulnerable a la contaminación de prototipo, donde las propiedades de un objeto prototipo pueden causar que aparezcan propiedades inesperadas al enumerar las entradas del diccionario. Por ejemplo, otra biblioteca de la aplicación puede decidir agregar algunos métodos de conveniencia a <code>Array.prototype</code>:</p>
<p className="p">Unfortunately, this code is vulnerable to prototype pollution, where properties on a prototype object can cause unexpected properties to appear when enumerating dictionary entries. For example, another library in the application may decide to add some convenience methods to <code>Array.prototype</code>:</p>
<pre><code>Array.prototype.first = function() &#123;<br></br>
return this[0];<br></br>
&#125;;<br></br>
<br></br>
Array.prototype.last = function() &#123;<br></br>
return this[this.length – 1];<br></br>
&#125;;</code></pre>
<p className="it">Ahora vea lo que sucede cuando tratamos de enumerar los elementos de nuestra matriz:</p>
<p className="p">Now see what happens when we attempt to enumerate the elements of our array:</p>
<pre><code>var names = [];<br></br>
<br></br>
for (var name in dict) &#123; names.push(name);<br></br>
&#125;<br></br>
<br></br>
names; // ["alice", "bob", "chris", "first", "last"]
</code></pre>
<p className="it">Esto nos lleva a la regla primaria de usar objetos como diccionarios ligeros: Sólo usamos instancias directas de Object como diccionarios, no subclases como NaiveDict, y ciertamente no arrays. Por ejemplo, podemos simplemente reemplazar el nuevo <code>Array()</code> anterior con nuevo Object() o incluso un literal de objeto vacío. El resultado es mucho menos susceptible a la contaminación prototipo:</p>
<p className="p">This brings us to the primary rule of using objects as lightweight dictionaries: Only use direct instances of Object as dictionaries—not subclasses such as NaiveDict, and certainly not arrays. For example, we can simply replace new <code>Array()</code> above with new Object() or even an empty object literal. The result is much less susceptible to prototype pollution:</p>
<pre><code>var dict = &#123;&#125;;<br></br>
<br></br>
dict.alice = 34;<br></br>
dict.bob = 24;<br></br>
dict.chris = 62;<br></br>
<br></br>
var names = [];<br></br>
<br></br>
for (var name in dict) &#123; names.push(name);<br></br>
&#125;<br></br>
<br></br>
names; // ["alice", "bob", "chris"]
</code></pre>
<p className="it">Ahora, nuestra nueva versión aún no está garantizada para estar a salvo de la contaminación. Alguien todavía podría venir y agregar propiedades a <code>Object.prototype</code>, y nos quedaríamos atrapados de nuevo. Pero al usar una instancia directa de Object, localizamos el riesgo a <code>Object.prototype</code> solo.</p>
<p className="p">Now, our new version is still not guaranteed to be safe from pollution. Anyone could still come along and add properties to <code>Object.prototype</code>, and we’d be stuck again. But by using a direct instance of Object, we localize the risk to <code>Object.prototype</code> alone.</p>
<p className="it">Entonces, ¿cómo es esta solución mejor? Por ejemplo, como se explica en el punto 47, nadie debe añadir propiedades a <code>Object.prototype</code> que puedan contaminar un bucle for ... in. Por el contrario, no es irrazonable agregar propiedades a Array.prototype. Por ejemplo, el ítem 42 explica cómo agregar métodos estándar a <code>Array.prototype</code> en entornos que no los proporcionan. Estas propiedades terminan contaminando para ... en bucles. Del mismo modo, una clase definida por el usuario normalmente tendrá propiedades en su prototipo. Pegarse a las instancias directas de Objeto (y siempre observando la regla del Artículo 47) mantiene su para ... en bucles libres de contaminación.</p>
<p className="p">So how is this solution any better? For one, as Item 47 explains, nobody should ever add properties to <code>Object.prototype</code> that could pollute a for...in loop. By contrast, it’s not unreasonable to add properties to Array.prototype. For example, Item 42 explains how to add standard methods to <code>Array.prototype</code> in environments that don’t provide them. These properties end up polluting for...in loops. Similarly, a user-defined class will typically have properties on its prototype. Sticking to direct instances of Object (and always observing the rule of Item 47) keeps your for...in loops free of pollution.</p>
<p className="it">¡Pero cuidado! Como lo atestiguan los ítems 44 y 45, esta regla es necesaria pero no suficiente para construir diccionarios bien educados. Tan conveniente como los diccionarios ligeros son, sufren de una serie de peligros. Es importante estudiar los tres elementos -o, si prefiere no memorizar las reglas, utilice una abstracción como la clase Dict del ítem 45.</p>
<p className="p">But beware! As Items 44 and 45 attest, this rule is necessary but  not sufficient for building well-behaved dictionaries. As convenient as lightweight dictionaries are, they suffer from a number of hazards.  It’s important to study all three of these Items—or, if you prefer not to memorize the rules, use an abstraction like the Dict class of Item 45.</p>
<h3>Things to Remember</h3>
<p className="it">Utilice literales de objetos para construir diccionarios ligeros.</p>
<p className="p">Use object literals to construct lightweight dictionaries.</p>
<p className="it">Los diccionarios ligeros deberían ser descendientes directos de <code>Object.prototype</code> para proteger contra la contaminación de prototipos en ... en bucles.</p>
<p className="p">Lightweight dictionaries should be direct descendants of <code>Object.prototype</code> to protect against prototype pollution in for...in loops.</p>
<h3>Item 44: Use null Prototypes to Prevent Prototype Pollution</h3>
<p className="it">Una de las maneras más fáciles de evitar la contaminación del prototipo es simplemente hacerla imposible en el primer lugar. Pero antes de ES5, no había manera estándar de crear un nuevo objeto con un prototipo vacío. Es posible que se sienta tentado a intentar establecer la propiedad prototipo de un constructor en null o undefined:</p>
<p className="p">One of the easiest ways to avoid prototype pollution is to just make it impossible in the first place. But before ES5, there was no standard way to create a new object with an empty prototype. You might be tempted to try setting a constructor’s prototype property to null or undefined:</p>
<pre><code>function C() &#123; &#125; C.prototype = null;</code></pre>
<p className="it">Sin embargo, instanciar este constructor todavía resulta en instancias de Object:</p>
<p className="p">But instantiating this constructor still results in instances of Object:</p>
<pre><code>var o = new C();<br></br>
Object.getPrototypeOf(o) === null;	// false<br></br>
Object.getPrototypeOf(o) === Object.prototype; // true</code></pre>
<p className="it">ES5 ofrece la primera forma estándar de crear un objeto sin prototipo. La función Object.create es capaz de construir dinámicamente objetos con un vínculo de prototipo especificado por el usuario y un mapa de descriptor de propiedad, que describe los valores y atributos de las propiedades del nuevo objeto. Simplemente pasando un argumento de prototipo nulo y un mapa descriptor vacío, podemos construir un objeto verdaderamente vacío:</p>
<p className="p">ES5 offers the first standard way to create an object with no prototype. The Object.create function is capable of dynamically constructing objects with a user-specified prototype link and a property descriptor map, which describes the values and attributes of the new object’s properties. By simply passing a null prototype argument and an empty descriptor map, we can build a truly empty object:</p>
<pre><code>var x = Object.create(null); Object.getPrototypeOf(o) === null;	// true</code></pre>
<p className="it">Ninguna cantidad de contaminación de prototipo puede afectar el comportamiento de tal objeto.</p>
<p className="p">No amount of prototype pollution can affect the behavior of such an object.</p>
<p className="it">Los entornos JavaScript más antiguos que no admiten Object.create pueden respaldar otro enfoque que merece la pena mencionar. En muchos entornos, la propiedad especial __proto__ (vea los ítems 31 y 32) proporciona acceso mágico de lectura y escritura al enlace de prototipo interno de un objeto. La sintaxis literal de objeto también admite la inicialización del enlace de prototipo de un nuevo objeto a null:</p>
<p className="p">Older JavaScript environments that do not support Object.create may support one other approach worth mentioning. In many environments, the special property __proto__ (see Items 31 and 32) provides magic read and write access to the internal prototype link of an object. The object literal syntax also supports initializing the prototype link of a new object to null:</p>
<pre><code>var x = &#123; proto : null &#125;;<br></br>
x instanceof Object;	// false (non-standard)</code></pre>
<p className="it">Esta sintaxis es igualmente conveniente, pero donde Object.create está disponible, es el enfoque más fiable. La propiedad __proto__ no es estándar y no todos los usos de la misma son portátiles. JavaScript implementaciones no están garantizados para apoyar en el futuro, por lo que debe atenerse a la Object.create estándar siempre que sea posible.</p>
<p className="p">This syntax is equally convenient, but where Object.create is available, it is the more reliable approach. The __proto__ property is nonstandard and not all uses of it are portable. JavaScript implementations are not guaranteed to support it in the future, so you should stick to the standard Object.create where possible.</p>
<p className="it">Lamentablemente, mientras que el __proto__ no estándar puede ser utilizado para resolver algunos problemas, también causa un problema adicional propio, evitando que los objetos libres de prototipos sean una implementación verdaderamente robusta de diccionarios. El punto 45 describe cómo en algunos entornos JavaScript, la clave de propiedad "__proto__" sí mismo contamina objetos incluso cuando no tienen ningún prototipo. Si no puede estar seguro de que la cadena "__proto__" nunca se utilizará como clave en su diccionario, considere utilizar la clase Dict más robusta descrita en el ítem 45.</p>
<p className="p">Sadly, while the nonstandard __proto__ can be used to solve some problems, it also causes an additional problem of its own, preventing prototype-free objects from being a truly robust implementation of dictionaries. Item 45 describes how in some JavaScript environments, the property key "__proto__" itself pollutes objects even when they have no prototype. If you can’t be sure that the string "__proto__" will never be used as a key in your dictionary, you should consider using the more robust Dict class described in Item 45.</p>
<h3>Things to Remember</h3>
<p className="it">En ES5, utilice Object.create (null) para crear objetos vacíos sin prototipo que sean menos susceptibles a la contaminación.</p>
<p className="p">In ES5, use Object.create(null) to create prototype-free empty objects that are less susceptible to pollution.</p>
<p className="it">En entornos más antiguos, considere usar &#123; __proto__: null &#125;.</p>
<p className="p">In older environments, consider using &#123; __proto__: null &#125;.</p>
<p className="it">Pero tenga en cuenta que __proto__ no es ni estándar ni totalmente portátil y puede ser eliminado en futuros entornos de JavaScript.</p>
<p className="p">But beware that __proto__ is neither standard nor entirely portable and may be removed in future JavaScript environments.</p>
<p className="it">Nunca use el nombre "__proto__" como clave de diccionario ya que algunos</p>
<p className="p">Never use the name "__proto__" as a dictionary key since some</p>
<pre><code>environments treat this property specially.</code></pre>
<h3>Item 45: Use hasOwnProperty to Protect Against Prototype Pollution</h3>
<p className="it">Los artículos 43 y 44 hablan de enumeración de propiedades, pero no hemos abordado la cuestión de la contaminación prototipo en la búsqueda de propiedades. Es tentador usar la sintaxis nativa de JavaScript para la manipulación de objetos para todas nuestras operaciones de diccionario:</p>
<p className="p">Items 43 and 44 talk about property enumeration, but we haven’t addressed the issue of prototype pollution in property lookup. It’s tempting to use JavaScript’s native syntax for object manipulation for all of our dictionary operations:</p>
<pre><code>"alice" in dict;	// membership test dict.alice;	// retrieval dict.alice = 24;	// update</code></pre>
<p className="it">Pero recuerde que las operaciones de objeto de JavaScript siempre funcionan con herencia. Incluso un literal de objeto vacío hereda una serie de propiedades de Object.prototype:</p>
<p className="p">But remember that JavaScript’s object operations always work with inheritance. Even an empty object literal inherits a number of properties from Object.prototype:</p>
<pre><code>var dict = &#123;&#125;;<br></br>
<br></br>
"alice" in dict;          // false<br></br>
"bob" in dict;	// false<br></br>
"chris" in dict;          // false<br></br>
"toString" in dict;       // true<br></br>
"valueOf" in dict;        // true</code></pre>
<p className="it">Por suerte, <code>Object.prototype</code> proporciona el método hasOwnProperty, que es sólo la herramienta que necesitamos para evitar la contaminación de prototipo al probar entradas de diccionario:</p>
<p className="p">Luckily, <code>Object.prototype</code> provides the hasOwnProperty method, which is just the tool we need to avoid prototype pollution when testing for dictionary entries:</p>
<pre><code>dict.hasOwnProperty("alice"); // false dict.hasOwnProperty("toString"); // false&#92;<br></br> dict.hasOwnProperty("valueOf"); // false</code></pre>
<p className="it">Del mismo modo, podemos proteger las búsquedas de propiedades contra la contaminación guardando la búsqueda con una prueba:</p>
<p className="p">Similarly, we can protect property lookups against pollution by guarding the lookup with a test:</p>
<pre><code>dict.hasOwnProperty("alice") ? dict.alice : undefined; dict.hasOwnProperty(x)&#92;<br></br> ? dict[x] : undefined;</code></pre>
<p className="it">Por desgracia, no hemos terminado. Cuando llamamos a dict.hasOwnProperty, estamos pidiendo que busque el método hasOwnProperty de dict. Normalmente esto simplemente sería heredado de Object.prototype. Pero si almacenamos una entrada en el diccionario bajo el nombre "hasOwnProperty", el método del prototipo ya no es accesible:</p>
<p className="p">Unfortunately, we aren’t quite done. When we call dict.hasOwnProperty, we’re asking to look up the hasOwnProperty method of dict. Normally this would simply be inherited from Object.prototype. But if we store an entry in the dictionary under the name "hasOwnProperty", the prototype’s method is no longer accessible:</p>
<pre><code>dict.hasOwnProperty = 10; dict.hasOwnProperty("alice");<br></br>
// error: dict.hasOwnProperty is not a function</code></pre>
<p className="it">Usted puede estar pensando que un diccionario nunca almacenaría una entrada con un nombre tan exótico como "hasOwnProperty". Y, por supuesto, depende de usted en el contexto de cualquier programa dado para decidir que este no es un escenario que nunca esperas que suceda. Pero ciertamente puede suceder, especialmente si está llenando el diccionario con entradas de un archivo externo, recurso de red o entrada de interfaz de usuario, donde terceros ajenos a su control pueden decidir qué claves terminan en el diccionario.</p>
<p className="p">You might be thinking that a dictionary would never store an entry with a name as exotic as "hasOwnProperty". And of course, it’s up to you in the context of any given program to decide that this isn’t a scenario you ever expect to happen. But it certainly can happen, especially if you’re filling the dictionary with entries from an external file, network resource, or user interface input, where third parties beyond your control get to decide what keys end up in the dictionary.</p>
<p className="it">El enfoque más seguro es no hacer suposiciones. En lugar de llamar a hasOwnProperty como un método del diccionario, podemos usar el método de llamada descrito en el ítem 20. Primero extraemos el método hasOwnProperty con antelación desde cualquier ubicación bien conocida:</p>
<p className="p">The safest approach is to make no assumptions. Instead of calling hasOwnProperty as a method of the dictionary, we can use the call method described in Item 20. First we extract the hasOwnProperty method in advance from any well-known location:</p>
<pre><code>var hasOwn = Object.prototype.hasOwnProperty;</code></pre>
<p className="it">O más concisamente:</p>
<p className="p">Or more concisely:</p>
<pre><code>var hasOwn = &#123;&#125;.hasOwnProperty;</code></pre>
<p className="it">Ahora que tenemos una variable local unida a la función apropiada, podemos llamarla a cualquier objeto usando el método de llamada de la función:</p>
<p className="p">Now that we have a local variable bound to the proper function, we can call it on any object by using the function’s call method:</p>
<pre><code>hasOwn.call(dict, "alice");</code></pre>
<p className="it">Este enfoque funciona independientemente de si su receptor ha reemplazado su método hasOwnProperty:</p>
<p className="p">This approach works regardless of whether its receiver has overridden its hasOwnProperty method:</p>
<pre><code>var dict = &#123;&#125;;<br></br>
<br></br>
dict.alice = 24;<br></br>
hasOwn.call(dict, "hasOwnProperty"); // false<br></br>
hasOwn.call(dict, "alice"); // true<br></br>
<br></br>
dict.hasOwnProperty = 10;<br></br>
hasOwn.call(dict, "hasOwnProperty"); // true<br></br>
hasOwn.call(dict, "alice");          // true</code></pre>
<p className="it">Para evitar la inserción de esta plantilla en todas partes, hacemos una búsqueda, podemos abstraer este patrón en un constructor Dict que encapsula todas las técnicas para escribir diccionarios robustos en una sola definición de tipo de datos:</p>
<p className="p">To avoid inserting this boilerplate everywhere we do a lookup, we can abstract out this pattern into a Dict constructor that encapsulates all of the techniques for writing robust dictionaries in a single datatype definition:</p>
<pre><code>function Dict(elements) &#123;<br></br>
// allow an optional initial table<br></br>
this.elements = elements || &#123;&#125;;	// simple Object<br></br>
&#125;<br></br>
<br></br>
Dict.prototype.has = function(key) &#123;<br></br>
// own property only<br></br>
return &#123;&#125;.hasOwnProperty.call(this.elements, key);<br></br>
&#125;;<br></br>
<br></br>
<br></br>
Dict.prototype.get = function(key) &#123;<br></br>
// own property only<br></br>
return this.has(key)<br></br>
? this.elements[key]<br></br>
: undefined;<br></br>
&#125;;<br></br>
<br></br>
Dict.prototype.set = function(key, val) &#123;<br></br>
this.elements[key] = val;<br></br>
&#125;;<br></br>
<br></br>
Dict.prototype.remove = function(key) &#123;<br></br>
delete this.elements[key];<br></br>
&#125;;</code></pre>
<p className="it">Observe que no protegemos la implementación de Dict.prototype.set, ya que la adición de la clave al objeto de diccionario se convierte en una de las propiedades del propio objeto de elementos, incluso si hay una propiedad del mismo nombre en Object.prototype.</p>
<p className="p">Notice that we don’t protect the implementation of Dict.prototype.set, since adding the key to the dictionary object becomes one of the elements object’s own properties, even if there is a property of the same name in Object.prototype.</p>
<p className="it">Esta abstracción es más robusta que la utilización de la sintaxis de objetos predeterminada de JavaScript y es casi tan práctica de usarla:</p>
<p className="p">This abstraction is more robust than using JavaScript’s default object syntax and almost as convenient to use:</p>
<pre><code>var dict = new Dict(&#123; alice: 34,<br></br>
bob: 24,<br></br>
chris: 62<br></br>
&#125;);<br></br>
<br></br>
dict.has("alice");	// true dict.get("bob");	// 24 dict.has("valueOf"); // false</code></pre>
<p className="it">Recuerde que en algunos entornos JavaScript, el nombre especial de la propiedad __proto__ puede causar problemas de contaminación propios. En algunos entornos, la propiedad __proto__ simplemente se hereda de <code>Object.prototype</code>, por lo que los objetos vacíos están (misericordiosamente) verdaderamente vacíos:</p>
<p className="p">Recall from Item 44 that in some JavaScript environments, the special property name __proto__ can cause pollution problems of its own. In some environments, the __proto__ property is simply inherited from <code>Object.prototype</code>, so empty objects are (mercifully) truly empty:</p>
<pre><code>var empty = Object.create(null); " proto " in empty;<br></br>
// false (in some environments)<br></br>
<br></br>
var hasOwn = &#123;&#125;.hasOwnProperty; hasOwn.call(empty, " proto ");<br></br>
// false (in some environments)</code></pre>
<p className="it">En otros, sólo el operador in reporta:</p>
<p className="p">In others, only the in operator reports true:</p>
<pre><code>var empty = Object.create(null);<br></br>
  proto  " in empty;	// true (in some environments)<br></br>

var hasOwn = &#123;&#125;.hasOwnProperty;<br></br>
hasOwn.call(empty, " proto "); // false (in some environments)</code></pre>
<p className="it">Pero desafortunadamente, algunos ambientes contaminan permanentemente todos los objetos con la apariencia de una propiedad de instancia llamada __proto__:</p>
<p className="p">But unfortunately, some environments permanently pollute all objects with the appearance of an instance property called __proto__:</p>
<pre><code>var empty = Object.create(null);<br></br>
  proto  " in empty;	// true (in some environments)<br></br>
<br></br>
var hasOwn = &#123;&#125;.hasOwnProperty;<br></br>
hasOwn.call(empty, " proto "); // true (in some environments)</code></pre>
<p className="it">Esto significa que dependiendo del entorno, el código siguiente podría tener resultados diferentes:</p>
<p className="p">This means that depending on the environment, the following code could have different results:</p>
<pre><code>var dict = new Dict(); dict.has(" proto "); // ?</code></pre>
<p className="it">Para una máxima portabilidad y seguridad, esto nos deja sin más remedio que añadir un caso especial para la clave "__proto__" a cada uno de los métodos Dict, lo que resulta en la siguiente implementación final más compleja pero segura:</p>
<p className="p">For maximum portability and safety, this leaves us with no choice but to add a special case for the "__proto__" key to each of the Dict methods, resulting in the following more complex but safer final implementation:</p>
<pre><code>function Dict(elements) &#123;<br></br>
// allow an optional initial table<br></br>
this.elements = elements || &#123;&#125;;	// simple Object this.hasSpecialProto&#92;<br></br> = false;&#92;<br></br>	// has " proto " key? this.specialProto = undefined;&#92;<br></br>	// " proto " element<br></br>
&#125;<br></br>
<br></br>
Dict.prototype.has = function(key) &#123;<br></br>
if (key === " proto ") &#123;<br></br>
return this.hasSpecialProto;<br></br>
&#125;<br></br>
// own property only<br></br>
return &#123;&#125;.hasOwnProperty.call(this.elements, key);<br></br>
&#125;;<br></br>
<br></br>
Dict.prototype.get = function(key) &#123;<br></br>
if (key === " proto ") &#123;<br></br>
return this.specialProto;<br></br>
&#125;<br></br>
<br></br>
<br></br>
// own property only<br></br>
return this.has(key)<br></br>
? this.elements[key]<br></br>
: undefined;<br></br>
&#125;;<br></br>
<br></br>
Dict.prototype.set = function(key, val) &#123;<br></br>
if (key === " proto ") &#123; this.hasSpecialProto = true; this.specialProto = val;<br></br>
&#125; else &#123;<br></br>
this.elements[key] = val;<br></br>
&#125;<br></br>
&#125;;<br></br>
<br></br>
Dict.prototype.remove = function(key) &#123;<br></br>
if (key === " proto ") &#123; this.hasSpecialProto = false; this.specialProto = undefined;<br></br>
&#125; else &#123;<br></br>
delete this.elements[key];<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">Esta implementación está garantizada para funcionar independientemente del manejo de un entorno __proto__, ya que evita tratar con las propiedades de ese nombre:</p>
<p className="p">This implementation is guaranteed to work regardless of an environment’s handling of __proto__, since it avoids ever dealing with properties of that name:</p>
<pre><code>var dict = new Dict(); dict.has(" proto "); // false</code></pre>
<h3>Things to Remember</h3>
<p className="it">Use hasOwnProperty para proteger contra la contaminación de prototipo.</p>
<p className="p">Use hasOwnProperty to protect against prototype pollution.</p>
<p className="it">Utilizar el alcance léxico y la llamada para proteger contra la</p>
<p className="p">Use lexical scope and call to protect against overriding of the</p>
<pre><code>hasOwnProperty method.</code></pre>
<p className="it">Considere la posibilidad de implementar operaciones de diccionario en una clase que encapsula las pruebas hasOwnProperty.</p>
<p className="p">Consider implementing dictionary operations in a class that encapsulates the boilerplate hasOwnProperty tests.</p>
<p className="it">Utilice una clase de diccionario para protegerse contra el uso de "__proto__" como clave.</p>
<p className="p">Use a dictionary class to protect against the use of "__proto__" as a key.</p>
<h3>Item 46: Prefer Arrays to Dictionaries for Ordered Collections</h3>
<p className="it">Intuitivamente, un objeto JavaScript es una colección desordenada de propiedades. Conseguir y fijar diversas características debe trabajar en cualquier orden, produciendo los mismos resultados y más o menos la misma eficacia. El estándar ECMAScript no especifica ningún orden particular de almacenamiento de propiedad y es incluso en gran medida el tema de la enumeración.</p>
<p className="p">Intuitively, a JavaScript object is an unordered collection of properties. Getting and setting different properties should work in any order, producing the same results and roughly the same efficiency. The ECMAScript standard does not specify any particular order of property storage and is even largely mum on the subject of enumeration.</p>
<p className="it">Pero aquí está la captura: Un bucle for ... in tiene que elegir un orden para enumerar las propiedades de un objeto. Y como el estándar permite a los motores de JavaScript la libertad de elegir un pedido, su elección puede cambiar sutilmente el comportamiento de su programa. Un error común es proporcionar una API que requiera un objeto que represente una asignación ordenada de cadenas a valores, como para crear un informe ordenado:</p>
<p className="p">But here’s the catch: A for...in loop has to pick some order to enumerate an object’s properties. And since the standard allows JavaScript engines the freedom to choose an order, their choice can subtly change your program’s behavior. A common mistake is to provide an API that requires an object representing an ordered mapping from strings to values, such as for creating an ordered report:</p>
<pre><code>function report(highScores) &#123;<br></br>
var result = "";<br></br>
var i = 1;<br></br>
for (var name in highScores) &#123; // unpredictable order<br></br>
result += i + ". " + name + ": " + highScores[name] + "\n";<br></br>
i++;<br></br>
&#125;<br></br>
return result;<br></br>
&#125;<br></br>
<br></br>
report([&#123; name: "Hank", points: 1110100 &#125;,<br></br>
&#123; name: "Steve", points: 1064500 &#125;,<br></br>
&#123; name: "Billy", points: 1050200 &#125;]);<br></br>
// ?</code></pre>
<p className="it">Debido a que diferentes entornos pueden optar por almacenar y enumerar las propiedades del objeto en órdenes diferentes, esta función puede resultar en diferentes cadenas, potencialmente alterando el orden del informe de puntuaciones altas.</p>
<p className="p">Because different environments may choose to store and enumer ate the properties of the object in different orders, this function can result in different strings, potentially jumbling the order of the “high scores” report.</p>
<p className="it">Tenga en cuenta que no siempre es obvio si su programa depende del orden de la enumeración del objeto. Si no prueba su programa en varios entornos de JavaScript, es posible que ni siquiera note que su comportamiento puede cambiar en función del orden exacto de un bucle for ... in.</p>
<p className="p">Keep in mind that it may not always be obvious whether your program depends on the order of object enumeration. If you don’t test your program in multiple JavaScript environments, you may not even notice that its behavior can change based on the exact ordering of a for...in loop.</p>
<p className="it">Si necesita depender del orden de las entradas en una estructura de datos, utilice una matriz en lugar de un diccionario. La función de informe anterior funcionaría completamente predecible en cualquier entorno de JavaScript si su API esperaba una matriz de objetos en lugar de un solo objeto:</p>
<p className="p">If you need to depend on the order of entries in a data structure, use an array instead of a dictionary. The report function above would work completely predictably in any JavaScript environment if its API expected an array of objects instead of a single object:</p>
<pre><code>function report(highScores) &#123;<br></br>
var result = "";<br></br>
for (var i = 0, n = highScores.length; i &#60; n; i++) &#123;<br></br>
var score = highScores[i]; result += (i + 1) + ". " +<br></br>
score.name + ": " + score.points + "\n";<br></br>
&#125;<br></br>
return result;<br></br>
&#125;<br></br>
<br></br>
report([&#123; name: "Hank", points: 1110100 &#125;,<br></br>
&#123; name: "Steve", points: 1064500 &#125;,<br></br>
&#123; name: "Billy", points: 1050200 &#125;]);<br></br>
// "1. Hank: 1110100\n2. Steve: 1064500\n3. Billy: 1050200\n"</code></pre>
<p className="it">Al aceptar una matriz de objetos, cada uno con un nombre y una propiedad de puntos, esta versión itera predeciblemente sobre los elementos en un orden preciso: de 0 a highScores.length - 1.</p>
<p className="p">By accepting an array of objects, each with a name and points property, this version predictably iterates over the elements in a precise order: from 0 to highScores.length – 1.</p>
<p className="it">Una gran fuente de dependencias de orden sutiles es la aritmética de punto flotante. Considere un diccionario de películas que los mapas de los títulos a las calificaciones:</p>
<p className="p">A terrific source of subtle order dependencies is floating-point arithmetic. Consider a dictionary of films that maps titles to ratings:</p>
<pre><code>var ratings = &#123;<br></br>
"Good Will Hunting": 0.8, "Mystic River": 0.7,<br></br>
"21": 0.6,<br></br>
"Doubt": 0.9<br></br>
&#125;;</code></pre>
<p className="it">Como vimos en el punto 2, el redondeo en aritmética de coma flotante puede conducir a sutiles dependencias en el orden de las operaciones. Cuando se combina con el orden de enumeración indefinido, esto puede dar lugar a algunos bucles impredecibles:</p>
<p className="p">As we saw in Item 2, rounding in floating-point arithmetic can lead to subtle dependencies on the order of operations. When combined with undefined order of enumeration, this can lead to some unpredictable loops:</p>
<pre><code>var total = 0, count = 0;<br></br>
for (var key in ratings) &#123; // unpredictable order<br></br>
total += ratings[key]; count++;<br></br>
&#125;<br></br>
total /= count; total; // ?</code></pre>
<p className="it">Como resulta, los entornos JavaScript populares de hecho realizan este bucle en diferentes órdenes. Por ejemplo, algunos entornos enumeran claves de objetos en el orden en que se agregan al objeto, calculando de manera efectiva:</p>
<p className="p">As it turns out, popular JavaScript environments do in fact  perform this loop in different orders. For example, some environments enumerate object keys in the order in which they are added to the object, effectively computing:</p>
<pre><code>(0.8 + 0.7 + 0.6 + 0.9) / 4	// 0.75</code></pre>
<p className="it">Otros siempre enumeran los índices de matriz potencial antes de cualquier otra clave. Dado que la película 21 pasa a tener un nombre que es un índice de matriz viable, se obtiene enumerado en primer lugar, lo que resulta en:</p>
<p className="p">Others always enumerate potential array indices first before any other keys. Since the movie 21 happens to have a name that is a viable array index, it gets enumerated first, resulting in:</p>
<pre><code>(0.6 + 0.8 + 0.7 + 0.9) / 4	// 0.7499999999999999</code></pre>
<p className="it">En este caso, una mejor representación es usar valores enteros en el diccionario, ya que la adición de números enteros se puede realizar en cualquier orden. De esta manera, las operaciones de división sensibles se realizan sólo al final - crucialmente, después de que el bucle esté completo:</p>
<p className="p">In this case, a better representation is to use integer values in the dictionary, since integer addition can be performed in any order. This way, the sensitive division operations are performed only at the very end—crucially, after the loop is complete:</p>
<pre><code>(8 + 7 + 6 + 9) / 4 / 10	// 0.75<br></br>
(6 + 8 + 7 + 9) / 4 / 10	// 0.75</code></pre>
<p className="it">En general, siempre debe tener cuidado al ejecutar un bucle for ... in que las operaciones que realiza se comportan iguales, independientemente de su orden.</p>
<p className="p">In general, you should always take care when executing a for...in loop that the operations you perform behave the same regardless of their order.</p>
<h3>Things to Remember</h3>
<p className="it">Evite confiar en el orden en el que para ... en bucles enumerar las propiedades del objeto.</p>
<p className="p">Avoid relying on the order in which for...in loops enumerate object properties.</p>
<p className="it">Si agrega datos en un diccionario, asegúrese de que las operaciones agregadas no sean sensibles a la orden.</p>
<p className="p">If you aggregate data in a dictionary, make sure the aggregate operations are order-insensitive.</p>
<p className="it">Utilice arrays en lugar de objetos de diccionario para colecciones ordenadas.</p>
<p className="p">Use arrays instead of dictionary objects for ordered collections.</p>
<h3>Item 47: Never Add Enumerable Properties to Object.prototype</h3>
<p className="it">El for ... in loop es muy conveniente, pero como vimos en el punto 43 es susceptible a la contaminación prototipo. Ahora, el uso más común de para ... en de lejos está enumerando los elementos de un diccionario. La implicación es inevitable: si desea permitir el uso de ... en los objetos de diccionario, nunca agregue propiedades enumerables al <code>Object.prototype</code> compartido.</p>
<p className="p">The for...in loop is awfully convenient, but  as we saw in Item 43 it is susceptible to prototype pollution. Now, the most common use of for...in by far is enumerating the elements of a dictionary. The implication is unavoidable: If you want to permit the use of for...in on dictionary objects, never add enumerable properties to the shared Object.prototype.</p>
<p className="it">Esta regla puede venir como una gran decepción: ¿Qué podría ser más poderoso que agregar métodos de conveniencia a <code>Object.prototype</code> que de repente todos los objetos pueden compartir? Por ejemplo, ¿qué pasa si agregamos un método allKeys que produce una matriz de nombres de propiedad de un objeto?</p>
<p className="p">This rule may come as a great disappointment: What could be more powerful than adding convenience methods to <code>Object.prototype</code> that suddenly all objects can share? For example, what if we added an allKeys method that produces an array of an object’s property names?</p>
<pre><code>Object.prototype.allKeys = function() &#123;<br></br>
var result = [];<br></br>
for (var key in this) &#123; result.push(key);<br></br>
&#125;<br></br>
return result;<br></br>
&#125;;</code></pre>
<p className="it">Lamentablemente, este método contamina incluso su propio resultado:</p>
<p className="p">Sadly, this method pollutes even its own result:</p>
<pre><code>(&#123; a: 1, b: 2, c: 3 &#125;).allKeys(); // ["allKeys", "a", "b", "c"]</code></pre>
<p className="it">Por supuesto, siempre podríamos mejorar nuestro método allKeys para ignorar las propiedades de Object.prototype. Pero con la libertad viene la responsabilidad, y nuestras acciones en un prototipo altamente compartido tienen consecuencias en todos los que usan ese objeto. Simplemente agregando una sola propiedad a <code>Object.prototype</code>, forzamos a todo el mundo a proteger su ... en loops.</p>
<p className="p">Of course, we could always improve our allKeys method to ignore properties of Object.prototype. But with freedom comes responsibility, and our actions on a highly shared prototype object have consequences on everyone who uses that object. Just by adding one single property to <code>Object.prototype</code>, we force everyone everywhere to protect his for...in loops.</p>
<p className="it">Es un poco menos conveniente, pero en última instancia mucho más cooperativo, definir todas las teclas como una función más que como un método.</p>
<p className="p">It is slightly less convenient, but ultimately much more cooperative, to define allKeys as a function rather than as a method.</p>
<pre><code>function allKeys(obj) &#123;<br></br>
var result = [];<br></br>
for (var key in obj) &#123; result.push(key);<br></br>
&#125;<br></br>
return result;<br></br>
&#125;</code></pre>
<p className="it">Pero si desea agregar propiedades a <code>Object.prototype</code>, ES5 proporciona un mecanismo para hacerlo de manera más cooperativa. El método Object.defineProperty permite definir una propiedad de objeto simultáneamente con metadatos sobre los atributos de la propiedad. Por ejemplo, podemos definir la propiedad anterior exactamente como antes pero hacerla invisible para for ... in estableciendo su atributo enumerable en false:</p>
<p className="p">But if you do want to add properties to <code>Object.prototype</code>, ES5 provides a mechanism for doing it more cooperatively. The Object.defineProperty method makes it possible to define an object property simultaneously with metadata about the property’s attributes. For example, we can define the above property exactly as before but make it invisible to for...in by setting its enumerable attribute to false:</p>
<pre><code>Object.defineProperty(Object.prototype, "allKeys", &#123; value: function() &#123;<br></br>
var result = [];<br></br>
for (var key in this) &#123; result.push(key);<br></br>
&#125;<br></br>
return result;<br></br>
&#125;,<br></br>
writable: true,<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
enumerable: false, configurable: true</code></pre>
<p className="it">Es cierto que este código es un bocado. Pero esta versión tiene la ventaja de no contaminar todos los demás para ... en bucle sobre todas las demás instancias de Object.</p>
<p className="p">Admittedly, this code is a mouthful. But this version has the distinct advantage of not polluting every other for...in loop over every other instance of Object.</p>
<p className="it">De hecho, vale la pena usar esta técnica para otros objetos también. Siempre que necesite agregar una propiedad que no debería ser visible para ... en bucles, Object.defineProperty es su amigo.</p>
<p className="p">In fact, it’s worth using this technique for other objects as well. Whenever you need to add a property that should not be visible to for...in loops, Object.defineProperty is your friend.</p>
<h3>Things to Remember</h3>
<p className="it">Evite agregar propiedades a Object.prototype.</p>
<p className="p">Avoid adding properties to Object.prototype.</p>
<p className="it">Considere escribir una función en lugar de un método Object.prototype.</p>
<p className="p">Consider writing a function instead of an <code>Object.prototype</code> method.</p>
<p className="it">Si agrega propiedades a <code>Object.prototype</code>, utilice ES5</p>
<p className="p">If you do add properties to <code>Object.prototype</code>, use ES5’s</p>
<p className="it">Object.defineProperty para definirlas como propiedades no enumerables.</p>
<p className="p">Object.defineProperty to define them as nonenumerable properties.</p>
<h3>Item 48: Avoid Modifying an Object during Enumeration</h3>
<p className="it">Una red social tiene un conjunto de miembros y, para cada miembro, una lista de amigos registrados:</p>
<p className="p">A social network has a set of members and, for each member, a registered list of friends:</p>
<pre><code>function Member(name) &#123; this.name = name; this.friends = [];<br></br>
&#125;<br></br>
<br></br>
var a = new Member("Alice"), b = new Member("Bob"),<br></br>
c = new Member("Carol"), d = new Member("Dieter"), e = new Member("Eli"),<br></br>
f = new Member("Fatima");<br></br>
<br></br>
a.friends.push(b); b.friends.push(c); c.friends.push(e); d.friends.push(b);&#92;<br></br> e.friends.push(d, f);</code></pre>
<p className="it">Buscar esa red significa atravesar el gráfico de la red social (ver Figura 5.1). Esto se implementa a menudo con un conjunto de</p>
<p className="p">Searching that network means traversing the social network graph (see Figure 5.1). This is often implemented with a work-set, which</p>
<p className="it">Figura 5.1 Gráfico de una red social</p>
<p className="p">Figure 5.1 A social network graph</p>
<p className="it">Comienza con un único nodo raíz y tiene nodos agregados a medida que se descubren y se quitan cuando se visitan. Puede ser tentador intentar implementar este recorrido con un solo para ... in loop:</p>
<p className="p">starts with a single root node, and has nodes added as they are discovered and removed as they are visited. It may be tempting to try to implement this traversal with a single for...in loop:</p>
<pre><code>Member.prototype.inNetwork = function(other) &#123;<br></br>
var visited = &#123;&#125;;<br></br>
var workset = &#123;&#125;; workset[this.name] = this;<br></br>
for (var name in workset) &#123;<br></br>
var member = workset[name];<br></br>
delete workset[name];	// modified while enumerating<br></br>
if (name in visited) &#123;	// don't revisit members<br></br>
continue;<br></br>
&#125;<br></br>
visited[name] = member;<br></br>
if (member === other) &#123; // found?<br></br>
return true;<br></br>
&#125;<br></br>
member.friends.forEach(function(friend) &#123; workset[friend.name] = friend;<br></br>
&#125;);<br></br>
&#125;<br></br>
<br></br>
return false;<br></br>
&#125;;</code></pre>
<p className="it">Desafortunadamente, en muchos entornos JavaScript este código no funciona en absoluto:</p>
<p className="p">Unfortunately, in many JavaScript environments this code doesn’t work at all:</p>
<pre><code>a.inNetwork(f); // false</code></pre>
<p className="it">¿Que pasó? Como resulta, no se requiere un bucle for ... in para mantenerse al día con modificaciones al objeto que se está enumerando. De hecho, la norma ECMAScript deja espacio para que diferentes entornos de JavaScript se comporten de manera diferente con respecto a las modificaciones concurrentes. En particular, la norma establece:</p>
<p className="p">What happened? As it turns out, a for...in loop is not required to keep current with modifications to the object being enumerated. In fact, the ECMAScript standard leaves room for different JavaScript environments to behave differently with respect to concurrent modifications. In particular, the standard states:</p>
<p className="it">Si se agregan nuevas propiedades al objeto que se está enumerando durante la enumeración, no se garantiza que las propiedades recién agregadas se visiten en la enumeración activa.</p>
<p className="p">If new properties are added to the object being enumerated during enumeration, the newly added properties are not guaranteed to be visited in the active enumeration.</p>
<p className="it">La consecuencia práctica de esta subespecificación es que no podemos confiar en que ... en bucles se comporten de manera predecible si modificamos el objeto que se está enumerando.</p>
<p className="p">The practical consequence of this underspecification is that we cannot rely on for...in loops to behave predictably if we modify the object being enumerated.</p>
<p className="it">Vamos a dar a nuestro recorrido gráfico otro intento, esta vez la gestión del control de bucle nosotros mismos. Mientras estamos en ello, debemos utilizar nuestra abstracción de diccionario para evitar la contaminación de prototipo. Podemos colocar el diccionario en una clase WorkSet que rastrea el número de elementos que se encuentran actualmente en el conjunto:</p>
<p className="p">Let’s give our graph traversal another try, this time managing the loop control ourselves. While we’re at it, we should use our dictionary abstraction to avoid prototype pollution. We can place the dictionary in a WorkSet class that tracks the number of elements currently in the set:</p>
<pre><code>function WorkSet() &#123; this.entries = new Dict(); this.count = 0;<br></br>
&#125;<br></br>
<br></br>
WorkSet.prototype.isEmpty = function() &#123;<br></br>
return this.count === 0;<br></br>
&#125;;<br></br>
<br></br>
WorkSet.prototype.add = function(key, val) &#123;<br></br>
if (this.entries.has(key)) &#123;<br></br>
return;<br></br>
&#125;<br></br>
this.entries.set(key, val);<br></br>
this.count++;<br></br>
&#125;;<br></br>
<br></br>
WorkSet.prototype.get = function(key) &#123;<br></br>
return this.entries.get(key);<br></br>
&#125;;<br></br>

WorkSet.prototype.remove = function(key) &#123;<br></br>
if (!this.entries.has(key)) &#123;<br></br>
<br></br>
<br></br>
return;<br></br>
&#125;<br></br>
this.entries.remove(key); this.count--;<br></br>
&#125;;</code></pre>
<p className="it">Para escoger un elemento arbitrario del conjunto, necesitamos un nuevo método para la clase Dict:</p>
<p className="p">In order to pick an arbitrary element of the set, we need a new method for the Dict class:</p>
<pre><code>Dict.prototype.pick = function() &#123;<br></br>
for (var key in this.elements) &#123;<br></br>
if (this.has(key)) &#123;<br></br>
return key;<br></br>
&#125;<br></br>
&#125;<br></br>
throw new Error("empty dictionary");<br></br>
&#125;;<br></br>
<br></br>
WorkSet.prototype.pick = function() &#123;<br></br>
return this.entries.pick();<br></br>
&#125;;</code></pre>
<p className="it">Ahora podemos implementar inNetwork con un simple while loop, eligiendo elementos arbitrarios uno a la vez y eliminándolos del work-set.</p>
<p className="p">Now we can implement inNetwork with a simple while loop, choosing arbitrary elements one at a time and removing them from the work-set.</p>
<pre><code>Member.prototype.inNetwork = function(other) &#123;<br></br>
var visited = &#123;&#125;;<br></br>
var workset = new WorkSet(); workset.add(this.name, this); while (!workset.isEmpty()) &#123;<br></br>
var name = workset.pick();<br></br>
var member = workset.get(name); workset.remove(name);<br></br>
if (name in visited) &#123; // don't revisit members<br></br>
continue;<br></br>
&#125;<br></br>
visited[name] = member;<br></br>
if (member === other) &#123; // found?<br></br>
return true;<br></br>
&#125;<br></br>
member.friends.forEach(function(friend) &#123; workset.add(friend.name, friend);<br></br>
&#125;);<br></br>
&#125;<br></br>
return false;<br></br>
&#125;;</code></pre>
<p className="it">El método pick es un ejemplo de no determinismo: una operación que no está garantizada por la semántica del lenguaje para producir un solo resultado predecible. Este no determinismo viene del hecho de que el bucle for ... in puede elegir un orden diferente de enumeración en diferentes entornos JavaScript (o incluso en diferentes ejecuciones dentro del mismo entorno JavaScript, al menos en principio). Trabajar con el no determinismo puede ser complicado, porque introduce un elemento de imprevisibilidad en su programa. Las pruebas que pasan en una plataforma pueden fallar en otros o incluso fallar intermitentemente en la misma plataforma.</p>
<p className="p">The pick method is an example of nondeterminism: an operation that is not guaranteed by the language semantics to produce a single, predictable result. This nondeterminism comes from the fact that the for...in loop may choose a different order of enumeration in different JavaScript environments (or even in different executions within the same JavaScript environment, at least in principle). Working with nondeterminism can be tricky, because it introduces an element of unpredictability into your program. Tests that pass on one platform may fail on others or even fail intermittently on the same platform.</p>
<p className="it">Algunas fuentes de no determinismo son inevitables. Se supone que un generador de números aleatorios produce resultados impredecibles; Comprobar la fecha y la hora actuales siempre obtiene una respuesta diferente; Responder a las acciones de los usuarios, como los clics del ratón o pulsaciones de teclas necesariamente se comporta de manera diferente dependiendo del usuario. Pero es una buena idea ser claro acerca de qué partes de un programa tienen un único resultado esperado y qué partes pueden variar.</p>
<p className="p">Some sources of nondeterminism are unavoidable. A random number generator is supposed to produce unpredictable results; checking the current date and time always gets a different answer; responding to user actions such as mouse clicks or keystrokes necessarily behaves differently depending on the user. But it’s a good idea to be clear about what parts of a program have a single expected result and which parts can vary.</p>
<p className="it">Por estas razones, vale la pena considerar el uso de una alternativa determinista a un algoritmo de conjunto de trabajo: un algoritmo de lista de trabajo. Al almacenar elementos de trabajo en una matriz en lugar de un conjunto, el método inNetwork siempre recorre el gráfico exactamente en el mismo orden.</p>
<p className="p">For these reasons, it’s worth considering using a deterministic alternative to a work-set algorithm: a work-list algorithm. By storing work items in an array instead of a set, the inNetwork method always traverses the graph in exactly the same order.</p>
<pre><code>Member.prototype.inNetwork = function(other) &#123;<br></br>
var visited = &#123;&#125;;<br></br>
var worklist = [this];<br></br>
while (worklist.length &#62; 0) &#123;<br></br>
var member = worklist.pop();<br></br>
if (member.name in visited) &#123;	// don't revisit<br></br>
continue;<br></br>
&#125;<br></br>
visited[member.name] = member;<br></br>
if (member === other) &#123;	// found?<br></br>
return true;<br></br>
&#125;<br></br>
member.friends.forEach(function(friend) &#123; worklist.push(friend);	// add to work-list<br></br>
&#125;);<br></br>
&#125;<br></br>
return false;<br></br>
&#125;;</code></pre>
<p className="it">Esta versión de inNetwork agrega y elimina los elementos de trabajo de forma determinística. Puesto que el método devuelve siempre verdadero para los miembros conectados no importa qué trayectoria él encuentra, el resultado final es igual. Sin embargo, esto puede no ser el caso de otros métodos que podría importar escribir, como una variación en inNetwork que produce la ruta real que se encuentra a través del gráfico de miembro a miembro.</p>
<p className="p">This version of inNetwork adds and removes work items deterministically. Since the method always returns true for connected members no matter what path it finds, the end result is the same. But this may not be the case for other methods you might care to write, such as a variation on inNetwork that produces the actual path found through the graph from member to member.</p>
<h3>Things to Remember</h3>
<p className="it">Asegúrese de no modificar un objeto al enumerar sus propiedades con un bucle for ... in.</p>
<p className="p">Make sure not to modify an object while enumerating its properties with a for...in loop.</p>
<p className="it">Utilice un bucle while o clásico para loop en lugar de un bucle for ... in cuando iterar sobre un objeto cuyo contenido podría cambiar durante el bucle.</p>
<p className="p">Use a while loop or classic for loop instead of a for...in loop when iterating over an object whose contents might change during the loop.</p>
<p className="it">Para una enumeración predecible sobre una estructura de datos cambiante, considere la posibilidad de utilizar una estructura de datos secuenciales, como una matriz en lugar de un objeto de diccionario.</p>
<p className="p">For predictable enumeration over a changing data structure, consider using a sequential data structure such as an array instead of a dictionary object.</p>
<h3>Item 49: Prefer for Loops to for...in Loops for <code>Array</code> Iteration</h3>
<p className="it">¿Cuál es el valor de la media en este código?</p>
<p className="p">What is the value of mean in this code?</p>
<pre><code>var scores = [98, 74, 85, 77, 93, 100, 89];<br></br>
var total = 0;<br></br>
for (var score in scores) &#123; total += score;<br></br>
&#125;<br></br>
var mean = total / scores.length; mean; // ?</code></pre>
<p className="it">¿Detectó el error? Si usted dijo que la respuesta era 88, usted entendió la intención del programa pero no su resultado real. Este programa comete el error demasiado fácil de confundir las claves y los valores de una matriz de números. A para ... in loop siempre enumera las claves. Una próxima conjetura plausible sería (0 + 1 + ... + 6) / 7 = 21, pero incluso eso es incorrecto. Recuerde que las claves de propiedad de objeto son siempre cadenas, incluso las propiedades indexadas de una matriz. Así que la operación + = termina realizando concatenación de cadena, resultando en un total no deseado de "00123456". ¿El final resulto? Un valor medio inverosímil de 17636.571428571428.</p>
<p className="p">Did you spot the bug? If you said the answer was 88, you understood the intention of the program but not its actual result. This program commits the all-too-easy mistake of confusing the keys  and values  of an array of numbers. A for...in loop always enumerates the keys.  A plausible next guess would be (0 + 1 + … + 6) / 7 = 21, but even that is incorrect. Remember that object property keys are always strings, even the indexed properties of an array. So the += operation ends up performing string concatenation, resulting in an unintended total of "00123456". The end result? An implausible mean value of 17636.571428571428.</p>
<p className="it">La forma correcta de iterar sobre el contenido de una matriz es utilizar un bucle clásico.</p>
<p className="p">The proper way to iterate over the contents of an array is to use a classic for loop.</p>
<pre><code>var scores = [98, 74, 85, 77, 93, 100, 89];<br></br>
var total = 0;<br></br>
for (var i = 0, n = scores.length; i &#60; n; i++) &#123; total += scores[i];<br></br>
&#125;<br></br>
<br></br>
<br></br>
var mean = total / scores.length; mean; // 88</code></pre>
<p className="it">Este enfoque asegura que tiene índices de enteros cuando los necesita y valores de elementos de matriz cuando los necesita y que nunca confunde los dos o provoca coerciones inesperadas en cadenas. Además, asegura que la iteración se produce en el orden correcto y no incluye accidentalmente propiedades no integeras almacenadas en el objeto matriz o en su cadena de prototipos.</p>
<p className="p">This approach ensures that you have integer indices when you need them and array element values when you need them, and that you never confuse the two or trigger unexpected coercions to strings. Moreover,  it ensures that the iteration occurs in the proper order  and does not accidentally include noninteger properties stored on the array object or in its prototype chain.</p>
<p className="it">Observe el uso de la variable de longitud del array n en el bucle for anterior. Si el cuerpo del bucle no modifica el array, el comportamiento del bucle es idéntico a simplemente recalcular la longitud del array en cada iteración:</p>
<p className="p">Notice the use of the array length variable n in the for loop above. If the loop body does not modify the array, the loop behavior is identical to simply recalculating the array length on every iteration:</p>
<pre><code>for (var i = 0; i &#60; scores.length; i++) &#123; ... &#125;</code></pre>
<p className="it">Sin embargo, hay un par de pequeños beneficios para calcular la longitud de la matriz una vez por delante del bucle. En primer lugar, incluso la optimización de los compiladores de JavaScript a veces puede resultar difícil probar que es seguro evitar recalput scores.length. Pero lo que es más importante, se comunica a la persona que lee el código que la condición de terminación del bucle es simple y fija.</p>
<p className="p">Still, there are a couple of small benefits to computing the array length once ahead of the loop. First, even optimizing JavaScript compilers may sometimes find it difficult to prove that it is safe to avoid recomputing scores.length. But more importantly, it communicates to the person reading the code that the loop’s termination condition is simple and fixed.</p>
<h3>Things to Remember</h3>
<p className="it">Utilice siempre un bucle for en vez de un bucle for ... in para iterar sobre las propiedades indexadas de una matriz.</p>
<p className="p">Always use a for loop rather than a for...in loop for iterating over the indexed properties of an array.</p>
<p className="it">Considere almacenar la propiedad length de una matriz en una variable local antes de un loop para evitar recalcular la búsqueda de propiedades.</p>
<p className="p">Consider storing the length property of an array in a local variable before a loop to avoid recomputing the property lookup.</p>
<h3>Item 50: Prefer Iteration Methods to Loops</h3>
<p className="it">Los buenos programadores odian escribir el mismo código dos veces. Copiar y pegar código de código de barras duplicado errores, hace que los programas más difíciles de cambiar, desorden los programas con patrones repetitivos, y deja a los programadores sin fin reinventar la rueda. Tal vez lo peor de todo, la repetición hace que sea demasiado fácil para alguien leer un programa para pasar por alto las diferencias menores de una instancia de un patrón a otro.</p>
<p className="p">Good programmers hate writing the same code twice. Copying and pasting boilerplate code duplicates bugs, makes programs harder to change, clutters up programs with repetitive patterns, and leaves programmers endlessly reinventing the wheel. Perhaps worst of all, repetition makes it too easy for someone reading a program to overlook minor differences from one instance of a pattern to another.</p>
<p className="it">Los bucles de JavaScript para JavaScript son razonablemente concisos y ciertamente familiares de muchos otros lenguajes como C, Java y C #, pero permiten un comportamiento bastante diferente con una ligera variación sintáctica. Algunos de los errores más notorios en la programación resultan de errores simples en la determinación de la condición de terminación de un bucle:</p>
<p className="p">JavaScript’s for loops are reasonably concise and certainly familiar from many other languages such as C, Java, and C#, but they allow for quite different behavior with only slight syntactic variation. Some of the most notorious bugs in programming result from simple mistakes in determining the termination condition of a loop:</p>
<pre><code>for (var i = 0; i &#60;= n; i++) &#123; ... &#125;<br></br>
// extra end iteration<br></br>
for (var i = 1; i &#60; n; i++) &#123; ... &#125;<br></br>
// missing first iteration<br></br>
<br></br>
<br></br>
for (var i = n; i &#62;= 0; i--) &#123; ... &#125;<br></br>
// extra start iteration<br></br>
for (var i = n 1; i &#62; 0; i--) &#123; ... &#125;<br></br>
// missing last iteration</code></pre>
<p className="it">Seamos realistas: calcular las condiciones de terminación es una resistencia. Es aburrido y hay demasiadas pequeñas maneras de estropear.</p>
<p className="p">Let’s face it: Figuring out termination conditions is a drag. It’s boring and there are just too many little ways to mess up.</p>
<p className="it">Afortunadamente, los cierres de JavaScript (consulte el ítem 11) son una manera conveniente y expresiva de crear abstracciones de iteración para estos patrones que nos salvan de tener que copiar y pegar encabezados de bucle.</p>
<p className="p">Thankfully, JavaScript’s closures (see Item 11) are a convenient and expressive way to build iteration abstractions for these patterns that save us from having to copy and paste loop headers.</p>
<p className="it">ES5 proporciona métodos de conveniencia para algunos de los patrones más comunes. Array.prototype.forEach es el más simple de estos. En lugar de escribir:</p>
<p className="p">ES5 provides convenience methods for some of the most common patterns. Array.prototype.forEach is the simplest of these. Instead of writing:</p>
<pre><code>for (var i = 0, n = players.length; i &#60; n; i++) &#123; players[i].score++;<br></br>
&#125;<br></br>
we can write:<br></br>
players.forEach(function(p) &#123; p.score++;<br></br>
&#125;);</code></pre>
<p className="it">Este código no sólo es más conciso y legible, sino que también elimina la condición de terminación y cualquier mención de índices de matriz.</p>
<p className="p">This code is not only more concise and readable, but it also eliminates the termination condition and any mention of array indices.</p>
<p className="it">Otro patrón común es construir una nueva matriz haciendo algo a cada elemento de otra matriz. Podríamos hacer esto con un bucle:</p>
<p className="p">Another common pattern is to build a new array by doing something to each element of another array. We could do this with a loop:</p>
<pre><code>var trimmed = [];<br></br>
for (var i = 0, n = input.length; i &#60; n; i++) &#123; trimmed.push(input[i].trim());<br></br>
&#125;</code></pre>
<p className="it">Alternativamente, podríamos hacer esto con forEach:</p>
<p className="p">Alternatively, we could do this with forEach:</p>
<pre><code>var trimmed = []; input.forEach(function(s) &#123;<br></br>
trimmed.push(s.trim());<br></br>
&#125;);</code></pre>
<p className="it">Pero este patrón de construcción de una nueva matriz de una matriz existente es tan común que ES5 introdujo Array.prototype.map para hacerlo más simple y elegante:</p>
<p className="p">But this pattern of building a new array from an existing array is so common that ES5 introduced Array.prototype.map to make it simpler and more elegant:</p>
<pre><code>var trimmed = input.map(function(s) &#123;<br></br>
return s.trim();<br></br>
&#125;);</code></pre>
<p className="it">Otro patrón común es calcular una nueva matriz que contiene sólo algunos de los elementos de una matriz existente. Array.prototype.filter hace esto sencillo: toma un predicado, una función que produce un valor verídico si el elemento debe mantenerse en la nueva matriz y un valor falsa si el elemento debe ser eliminado. Por ejemplo, podemos extraer de una lista de precios sólo los listados que se encuentran dentro de un rango de precios particular:</p>
<p className="p">Another common pattern is to compute a new array containing only some of the elements of an existing array. Array.prototype.filter makes this straightforward: It takes a predicate—a function that produces a truthy value if the element should be kept in the new array, and a falsy value if the element should be dropped. For example, we can extract from a price list only those listings that fall within a particular price range:</p>
<pre><code>listings.filter(function(listing) &#123;<br></br>
return listing.price &#62;= min && listing.price &#60;= max;<br></br>
&#125;);</code></pre>
<p className="it">Por supuesto, estos son sólo métodos disponibles de forma predeterminada en ES5. No hay nada que nos impida definir nuestras propias abstracciones de iteración. Por ejemplo, un patrón que a veces surge es extraer el prefijo más largo de una matriz que satisface un predicado:</p>
<p className="p">Of course, these are just methods available by default in ES5. There’s nothing stopping us from defining our own iteration abstractions. For example, one pattern that sometimes comes up is extracting the longest prefix of an array that satisfies a predicate:</p>
<pre><code>function takeWhile(a, pred) &#123;<br></br>
var result = [];<br></br>
for (var i = 0, n = a.length; i &#60; n; i++) &#123;<br></br>
if (!pred(a[i], i)) &#123;<br></br>
break;<br></br>
&#125;<br></br>
result[i] = a[i];<br></br>
&#125;<br></br>
return result;<br></br>
&#125;<br></br>

var prefix = takeWhile([1, 2, 4, 8, 16, 32], function(n) &#123;<br></br>
return n &#60; 10;<br></br>
&#125;); // [1, 2, 4, 8]</code></pre>
<p className="it">Observe que pasamos el índice de matriz i a pred, que puede elegir utilizar o ignorar. De hecho, todas las funciones de iteración en la biblioteca estándar, incluyendo forEach, mapa y filtro, pasan el índice de matriz a la función proporcionada por el usuario.</p>
<p className="p">Notice that we pass the array index i to pred, which it can choose to use or ignore. In fact, all of the iteration functions in the standard library, including forEach, map, and filter, pass the array index to the user-provided function.</p>
<p className="it">También podríamos definir takeWhile como un método añadiéndolo a <code>Array.prototype</code> (véase el ítem 42 para una discusión de las consecuencias de los prototipos estándar de patrones de mono como Array.prototype):</p>
<p className="p">We could also define takeWhile as a method by adding it to <code>Array.prototype</code> (see Item 42 for a discussion of the consequences of monkey-patching standard prototypes like Array.prototype):</p>
<pre><code>Array.prototype.takeWhile = function(pred) &#123;<br></br>
var result = [];<br></br>
for (var i = 0, n = this.length; i &#60; n; i++) &#123;<br></br>
if (!pred(this[i], i)) &#123;<br></br>
break;<br></br>
&#125;<br></br>
<br></br>
<br></br>
result[i] = this[i];<br></br>
&#125;<br></br>
return result;<br></br>
&#125;;<br></br>
<br></br>
var prefix = [1, 2, 4, 8, 16, 32].takeWhile(function(n) &#123;<br></br>
return n &#60; 10;<br></br>
&#125;); // [1, 2, 4, 8]</code></pre>
<p className="it">Hay algo que los bucles tienden a hacer mejor que las funciones de iteración: operaciones de flujo de control anormal como romper y continuar. Por ejemplo, sería difícil intentar implementar takeWhile usando forEach:</p>
<p className="p">There is one thing that loops tend to do better than iteration functions: abnormal control flow operations such as break and continue. For example, it would be awkward to attempt to implement takeWhile using forEach:</p>
<pre><code>function takeWhile(a, pred) &#123; var result = []; a.forEach(function(x, i) &#123;<br></br>
if (!pred(x)) &#123;<br></br>
// ?<br></br>
<br></br>
<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;<br></br>
result[i] = x;<br></br>
<br></br>
return result;<br></br>
&#125;</code></pre>
<p className="it">Podríamos usar una excepción interna para implementar la terminación temprana del bucle, pero esto sería incómodo y probablemente ineficaz:</p>
<p className="p">We could use an internal exception to implement the early termination of the loop, but this would be awkward and likely inefficient:</p>
<pre><code>function takeWhile(a, pred) &#123;<br></br>
var result = [];<br></br>
var earlyExit = &#123;&#125;; // unique value signaling loop break<br></br>
try &#123;<br></br>
a.forEach(function(x, i) &#123;<br></br>
if (!pred(x)) &#123;<br></br>
throw earlyExit;<br></br>
<br></br>
<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;<br></br>
result[i] = x;<br></br>
<br></br>
&#125; catch (e) &#123;<br></br>
if (e !== earlyExit) &#123; // only catch earlyExit<br></br>
throw e;<br></br>
&#125;<br></br>
&#125;<br></br>
return result;<br></br>
&#125;</code></pre>
<p className="it">Una vez que una abstracción se vuelve más verbosa que el código que está reemplazando, es un signo bastante seguro de que la cura es peor que la enfermedad.</p>
<p className="p">Once an abstraction becomes more verbose than the code it is replacing, it’s a pretty sure sign that the cure is worse than the disease.</p>
<p className="it">Alternativamente, los métodos de matriz ES5 algunos y cada se pueden utilizar como bucles que pueden terminar temprano. Se podría argumentar que estos métodos no fueron creados para este propósito; Se describen como predicados, aplicando un predicado de devolución de llamada repetidamente a cada elemento de una matriz. Específicamente, el método some devuelve un booleano que indica si su devolución de llamada devuelve un valor verídico para cualquiera de los elementos de la matriz:</p>
<p className="p">Alternatively, the ES5 array methods some and every can be used as loops that may terminate early. Arguably, these methods were not created for this purpose; they are described as predicates, applying a callback predicate repeatedly to each element of an array. Specifically, the some method returns a boolean indicating whether its callback returns a truthy value for any one of the array elements:</p>
<pre><code>[1, 10, 100].some(function(x) &#123; return x &#62; 5; &#125;); // true<br></br>
[1, 10, 100].some(function(x) &#123; return x &#60; 0; &#125;); // false</code></pre>
<p className="it">Análogamente, cada devuelve un booleano que indica si su devolución de llamada devuelve un valor verídico para todos los elementos:</p>
<p className="p">Analogously, every returns a boolean indicating whether its callback returns a truthy value for all of the elements:</p>
<pre><code>[1, 2, 3, 4, 5].every(function(x) &#123; return x &#62; 0; &#125;); // true<br></br>
[1, 2, 3, 4, 5].every(function(x) &#123; return x &#60; 3; &#125;); // false</code></pre>
<p className="it">Ambos métodos son cortocircuitos: Si la devolución de llamada a alguna vez produce un valor verídico, alguna devuelve sin procesar más elementos; De manera similar, cada devuelve inmediatamente si su devolución de llamada produce un valor false.</p>
<p className="p">Both methods are short-circuiting: If the callback to some ever produces a truthy value, some returns without processing any more elements; similarly, every returns immediately if its callback produces a falsy value.</p>
<p className="it">Este comportamiento hace que estos métodos sean útiles como una variante de forEach que puede terminar temprano. Por ejemplo, podemos implementar takeWhile con cada:</p>
<p className="p">This behavior makes these methods useful as a variant of forEach that can terminate early. For example, we can implement takeWhile with every:</p>
<pre><code>function takeWhile(a, pred) &#123; var result = []; a.every(function(x, i) &#123;<br></br>
if (!pred(x)) &#123;<br></br>
return false; // break<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;<br></br>
result[i] = x;<br></br>
return true; // continue<br></br>
<br></br>
return result;<br></br>
&#125;</code></pre>
<h3>Things to Remember</h3>
<p className="it">Utilice métodos de iteración como Array.prototype.forEach y Array.prototype.map en lugar de los bucles for para que el código sea más legible y evite la duplicación de la lógica de control de bucle.</p>
<p className="p">Use iteration methods such as Array.prototype.forEach and Array.prototype.map in place of for loops to make code more readable and avoid duplicating loop control logic.</p>
<p className="it">Utilice las funciones de iteración personalizadas para abstraer patrones de bucle comunes que no se proporcionan en la biblioteca estándar.</p>
<p className="p">Use custom iteration functions to abstract common loop patterns that are not provided by the standard library.</p>
<p className="it">Los bucles tradicionales pueden seguir siendo apropiados en los casos en que es necesaria una salida temprana; Alternativamente, todos y cada uno de los métodos se pueden utilizar para la salida temprana.</p>
<p className="p">Traditional loops can still be appropriate in cases where early exit is necessary; alternatively, the some and every methods can be used for early exit.</p>
<h3>Item 51: Reuse Generic <code>Array</code> Methods on Array-Like Objects</h3>
<p className="it">Los métodos estándar de <code>Array.prototype</code> fueron diseñados para ser reutilizables como métodos de otros objetos, incluso los objetos que no heredan de Array. Como resulta, una serie de tales objetos de tipo array aparecen en varios lugares en JavaScript.</p>
<p className="p">The standard methods of <code>Array.prototype</code> were designed to be reusable as methods of other objects—even objects that do not inherit from Array. As it turns out, a number of such array-like objects crop up in various places in JavaScript.</p>
<p className="it">Un buen ejemplo es el objeto de argumentos de una función, descrito en Item</p>
<p className="p">A good example is a function’s arguments object, described in Item</p>
<p className="it">Desafortunadamente, el objeto argumentos no hereda de Array.prototype, por lo que no podemos simplemente llamar a arguments.forEach para iterar sobre cada argumento. En su lugar, tenemos que extraer una referencia al objeto del método forEach y usar su método de llamada (vea el ítem 20):</p>
<p className="p">Unfortunately, the arguments object does not inherit from Array.prototype, so we cannot simply call arguments.forEach to iterate over each argument. Instead, we have to extract a reference to the forEach method object and use its call method (see Item 20):</p>
<pre><code>function highlight() &#123;<br></br>
[].forEach.call(arguments, function(widget) &#123; widget.setBackground("yellow");<br></br>
&#125;);<br></br>
&#125;</code></pre>
<p className="it">El método forEach es un objeto Function, lo que significa que hereda el método de llamada de Function.prototype. Esto nos permite llamar a cada uno con un valor personalizado para su enlace interno de este (en nuestro caso, el objeto argumentos), seguido por cualquier número de argumentos (en nuestro caso, la función de devolución de llamada simple). En otras palabras, este código se comporta como queremos.</p>
<p className="p">The forEach method is a Function object, which means it inherits  the call method from Function.prototype. This lets us call forEach with a custom value for its internal binding of this (in our case, the arguments object), followed by any number of arguments (in our case, the single callback function). In other words, this code behaves just like we want.</p>
<p className="it">En la plataforma web, la clase NodeList del DOM es otra instancia de un objeto similar a una matriz. Operaciones como document.getElementsByTagName que consultan una página web para nodos producen sus resultados de búsqueda como NodeLists. Al igual que el objeto arguments, un NodeList actúa como un array pero no hereda de Array.prototype.</p>
<p className="p">On the web platform, the DOM’s NodeList class is another instance of an array-like object. Operations such as document.getElementsByTagName that query a web page for nodes produce their search results as NodeLists. Like the arguments object, a NodeList acts like an array but does not inherit from Array.prototype.</p>
<p className="it">Entonces, ¿qué hace exactamente un objeto "array-like"? El contrato básico de un objeto array equivale a dos reglas simples.</p>
<p className="p">So what exactly makes an object “array-like”? The basic contract of an array object amounts to two simple rules.</p>
<p className="it">Tiene una propiedad de longitud entera en el rango 0 ... 232 - 1.</p>
<p className="p">It has an integer length property in the range 0...232 – 1.</p>
<p className="it">La propiedad length es mayor que el índice más grande del objeto. Un índice es un entero en el rango 0 ... 232-2 cuya representación de cadena es la clave de una propiedad del objeto.</p>
<p className="p">The length property is greater than the largest index of the object. An index is an integer in the range 0...232 – 2 whose string representation is the key of a property of the object.</p>
<p className="it">Elemento 51: Reutilizar métodos genéricos de matrices en objetos parecidos a matrices 139</p>
<p className="p">Item 51:  Reuse Generic <code>Array</code> Methods on Array-Like Objects	139</p>
<p className="it">Éste es todo el comportamiento que un objeto necesita implementar para ser compatible con cualquiera de los métodos de Array.prototype. Incluso un simple literal de objeto se puede utilizar para crear un objeto de tipo array:</p>
<p className="p">This is all the behavior an object needs to implement to be compatible with any of the methods of Array.prototype. Even a simple object literal can be used to create an array-like object:</p>
<pre><code>var arrayLike = &#123; 0: "a", 1: "b", 2: "c", length: 3 &#125;;<br></br>
var result = Array.prototype.map.call(arrayLike, function(s) &#123;<br></br>
return s.toUpperCase();<br></br>
&#125;); // ["A", "B", "C"]</code></pre>
<p className="it">Las cadenas actúan como matrices inmutables, también, ya que pueden ser indexadas y su longitud se puede acceder como una propiedad de longitud. Por lo tanto, los métodos <code>Array.prototype</code> que no modifican su matriz funcionan con cadenas:</p>
<p className="p">Strings act like immutable arrays, too, since they can be indexed  and their length can be accessed as a length property. So the <code>Array.prototype</code> methods that do not modify their array work with strings:</p>
<pre><code>var result = Array.prototype.map.call("abc", function(s) &#123;<br></br>
return s.toUpperCase();<br></br>
&#125;); // ["A", "B", "C"]</code></pre>
<p className="it">Ahora, simular todo el comportamiento de una matriz de JavaScript es más complicado, gracias a dos aspectos más del comportamiento de las matrices.</p>
<p className="p">Now, simulating all the behavior of a JavaScript array is trickier, thanks to two more aspects of the behavior of arrays.</p>
<p className="it">Si se establece la propiedad length en un valor menor n, se eliminan automáticamente las propiedades con un índice mayor o igual que n.</p>
<p className="p">Setting the length property to a smaller value n automatically deletes any properties with an index greater than or equal to n.</p>
<p className="it">La adición de una propiedad con un índice n mayor o igual al valor de la propiedad length establece automáticamente la propiedad length en n + 1.</p>
<p className="p">Adding a property with an index n that is greater than or equal  to the value of the length property automatically sets the length property to n + 1.</p>
<p className="it">La segunda de estas reglas es un orden particularmente alto, ya que requiere supervisar la adición de propiedades indexadas para actualizar la longitud automáticamente. Afortunadamente, ninguna de estas dos reglas es necesaria para el propósito de utilizar los métodos Array.prototype, ya que todos ellos actualizan a la fuerza la propiedad length siempre que agreguen o eliminen propiedades indexadas.</p>
<p className="p">The second of these rules is a particularly tall order, since it requires monitoring the addition of indexed properties in order to update length automatically. Thankfully, neither of these two rules is necessary for the purpose of using <code>Array.prototype</code> methods, since they all forcibly update the length property whenever they add or remove indexed properties.</p>
<p className="it">Sólo hay un método <code>Array</code> que no es totalmente genérico: el concat de concatenación de array concat. Este método puede ser llamado en cualquier receptor arraylike, pero prueba la [[Clase]] de sus argumentos. Si un argumento es un array verdadero, su contenido se concatena al resultado; De lo contrario, el argumento se agrega como un solo elemento. Esto significa, por ejemplo, que no podemos simplemente concatenar una matriz con el contenido de un objeto de argumentos:</p>
<p className="p">There is just one <code>Array</code> method that is not fully generic: the array concatenation method concat. This method can be called on any arraylike receiver, but it tests the [[Class]] of its arguments. If an argument is a true array, its contents are concatenated to the result; otherwise, the argument is added as a single element. This means, for example, that we can’t simply concatenate an array with the contents of an arguments object:</p>
<pre><code>function namesColumn() &#123;<br></br>
return ["Names"].concat(arguments);<br></br>
&#125;<br></br>
namesColumn("Alice", "Bob", "Chris");<br></br>
// ["Names", &#123; 0: "Alice", 1: "Bob", 2: "Chris" &#125;]</code></pre>
<p className="it">Con el fin de convencer concat para tratar un objeto de tipo array como un array verdadero, tenemos que convertirlo nosotros mismos. Un lenguaje popular y conciso para realizar esta conversión es llamar al método slice en el objeto tipo array:</p>
<p className="p">In order to convince concat to treat an array-like object as a true array, we have to convert it ourselves. A popular and concise idiom for doing this conversion is to call the slice method on the array-like object:</p>
<pre><code>function namesColumn() &#123;<br></br>
return ["Names"].concat([].slice.call(arguments));<br></br>
&#125;<br></br>
namesColumn("Alice", "Bob", "Chris");<br></br>
// ["Names", "Alice", "Bob", "Chris"]</code></pre>
<h3>Things to Remember</h3>
<p className="it">Reutilizar métodos de matriz genéricos en objetos de tipo array mediante la extracción de objetos de método y el uso de su método de llamada.</p>
<p className="p">Reuse generic <code>Array</code> methods on array-like objects by extracting method objects and using their call method.</p>
<p className="it">Cualquier objeto se puede utilizar con métodos <code>Array</code> genéricos si tiene propiedades indexadas y una propiedad length apropiada.</p>
<p className="p">Any object can be used with generic <code>Array</code> methods if it has indexed properties and an appropriate length property.</p>
<h3>Item 52: Prefer <code>Array</code> Literals to the <code>Array</code> Constructor</h3>
<p className="it">La elegancia de JavaScript se debe mucho a su sintaxis literal concisa para los bloques de construcción más comunes de los programas JavaScript: objetos, funciones y arreglos. Un literal es una manera encantadora de expresar un arreglo:</p>
<p className="p">JavaScript’s elegance owes a lot to its concise literal syntax for the most common building blocks of JavaScript programs: objects, functions, and arrays. A literal is a lovely way to express an array:</p>
<pre><code>var a = [1, 2, 3, 4, 5];</code></pre>
<p className="it">Ahora, puede usar el constructor Array:</p>
<p className="p">Now, you could use the <code>Array</code> constructor instead:</p>
<pre><code>var a = new Array(1, 2, 3, 4, 5);</code></pre>
<p className="it">Pero incluso dejando de lado la estética, resulta que el constructor de <code>Array</code> tiene algunos problemas sutiles. Por un lado, tiene que estar seguro de que nadie ha rebotado la variable Array:</p>
<p className="p">But even setting aside aesthetics, it turns out that the <code>Array</code> constructor has some subtle issues. For one, you have to be sure that no one has rebound the <code>Array</code> variable:</p>
<pre><code>function f(Array) &#123;<br></br>
return new Array(1, 2, 3, 4, 5);<br></br>
&#125;<br></br>
f(String); // new String(1)</code></pre>
<p className="it">También tiene que estar seguro de que nadie ha modificado la matriz global</p>
<p className="p">You also have to be sure that no one has modified the global Array</p>
<pre><code>variable:<br></br>
Array = String;<br></br>
new Array(1, 2, 3, 4, 5); // new String(1)</code></pre>
<p className="it">Hay un caso especial que preocuparse. Si llama al constructor <code>Array</code> con un único argumento numérico, hace algo completamente diferente: Intenta crear una matriz sin elementos pero cuya propiedad length es el argumento dado. Esto significa que ["hola"] y nuevo <code>Array</code> ("hola") se comportan de la misma, pero [17] y nuevo <code>Array</code> (17) hacer cosas completamente diferentes!</p>
<p className="p">There’s one more special case to worry about. If you call the <code>Array</code> constructor  with  a  single  numeric  argument,  it  does  something completely different: It attempts to create an array with no elements but whose length property is the given argument. This means that ["hello"] and new Array("hello") behave the same, but  [17] and new Array(17) do completely different things!</p>
<p className="it">Estas reglas no son necesariamente difíciles de aprender, pero es más claro y menos propenso a errores accidentales para utilizar literales de matriz, que tienen una semántica más regular y consistente.</p>
<p className="p">These are not necessarily difficult rules to learn, but it’s clearer and less prone to accidental bugs to use array literals, which have more regular, consistent semantics.</p>
<h3>Things to Remember</h3>
<p className="it">El constructor <code>Array</code> se comporta de manera diferente si su primer argumento es un número.</p>
<p className="p">The <code>Array</code> constructor behaves differently if its first argument is a number.</p>
<p className="it">Utilice literales de matriz en lugar del constructor Array.</p>
<p className="p">Use array literals instead of the <code>Array</code> constructor.</p>
</div>
</div>
  </Layout>
)
