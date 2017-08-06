import Layout from '../components/layout'

export default () => (
  <Layout title='Chapter 4'>
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
<p className="chapter">4</p>
<h1>Objects and Prototypes</h1>
<p className="it">Los objetos son la estructura de datos fundamental de JavaScript. Intuitivamente, un objeto representa una tabla que relaciona cadenas con valores. Pero cuando se cava más profundo, hay una buena cantidad de maquinaria que entra en los objetos.</p>
<p className="p">Objects are JavaScript’s fundamental data structure. Intuitively, an object represents a table relating strings to values. But when you dig deeper, there is a fair amount of machinery that goes into objects.</p>
<p className="it">Al igual que muchos lenguajes orientados a objetos, JavaScript proporciona soporte para la herencia de implementación: la reutilización de código o datos a través de un mecanismo de delegación dinámico. Pero a diferencia de muchos lenguajes convencionales, el mecanismo de herencia de JavaScript se basa en prototipos en lugar de clases. Para muchos programadores, JavaScript es el primer lenguaje orientado a objetos que encuentran sin clases.</p>
<p className="p">Like many object-oriented languages, JavaScript provides support  for implementation inheritance: the reuse of code or data through a dynamic delegation mechanism. But unlike many conventional languages, JavaScript’s inheritance mechanism is based on prototypes rather than classes. For many programmers, JavaScript is the first object-oriented language they encounter without classes.</p>
<p className="it">En muchos idiomas, cada objeto es una instancia de una clase asociada, que proporciona código compartido entre todas sus instancias. JavaScript, por el contrario, no tiene una noción incorporada de clases. En su lugar, los objetos heredan de otros objetos. Cada objeto está asociado con algún otro objeto, conocido como su prototipo. Trabajar con prototipos puede ser diferente de las clases, aunque muchos conceptos de los lenguajes orientados a objetos tradicionales continúan.</p>
<p className="p">In many languages, every object is an instance of an associated class, which provides code shared between all its instances. JavaScript, by contrast, has no built-in notion of classes. Instead, objects inherit from other objects. Every object is associated with some other object, known as its prototype. Working with prototypes can be different from classes, although many concepts from traditional object-oriented languages still carry over.</p>
<h3>Item 30: Understand the Difference between prototype, getPrototypeOf, and __proto__</h3>
<p className="it">Los prototipos implican tres accesores separados pero relacionados, todos los cuales son nombrados con cierta variación en la palabra prototipo. Esta desafortunada superposición lleva naturalmente a un poco de confusión. Vamos directamente al grano.</p>
<p className="p">Prototypes involve three separate but related accessors, all of which are named with some variation on the word prototype. This unfortunate overlap naturally leads to quite a bit of confusion. Let’s get straight to the point.</p>
<p className="it">C.prototype se utiliza para establecer el prototipo de objetos creados por el nuevo C ().</p>
<p className="p">C.prototype is used to establish the prototype of objects created by new C().</p>
<p className="it">Object.getPrototypeOf (obj) es el mecanismo estándar de ES5 para recuperar el objeto prototipo de obj.</p>
<p className="p">Object.getPrototypeOf(obj) is the standard ES5 mechanism for retrieving obj’s prototype object.</p>
<p className="it">Obj .__ proto__ es un mecanismo no estándar para recuperar el objeto prototipo de obj.</p>
<p className="p">obj.__proto__ is a nonstandard mechanism for retrieving obj’s prototype object.</p>
<p className="it">Para entender cada uno de estos, considere una definición típica de un tipo de datos JavaScript. El constructor de usuario espera ser llamado con el nuevo operador y toma un nombre y el hash de una cadena de contraseña y los almacena en su objeto creado.</p>
<p className="p">To understand each of these, consider a typical definition of a JavaScript datatype. The User constructor expects to be called with the new operator and takes a name and the hash of a password string and stores them on its created object.</p>
<pre><code>
function User(name, passwordHash) &#123; this.name = name; this.passwordHash = passwordHash;<br></br>
&#125;<br></br>
<br></br>
User.prototype.toString = function() &#123;<br></br>
return "[User " + this.name + "]";<br></br>
&#125;;<br></br>
<br></br>
User.prototype.checkPassword = function(password) &#123;<br></br>
return hash(password) === this.passwordHash;<br></br>
&#125;;<br></br>
<br></br>
var u = new User("sfalken",<br></br>
"0ef33ae791068ec64b502d6cb0191387");</code></pre>
<p className="it">La función User viene con una propiedad prototipo predeterminada, que contiene un objeto que empieza más o menos vacío. En este ejemplo, agregamos dos métodos al objeto User.prototype: toString y checkPassword. Cuando creamos una instancia de Usuario con el nuevo operador, el objeto resultante u obtiene el objeto almacenado en User.prototype asignado automáticamente como su objeto prototipo. La figura 4.1 muestra un diagrama de estos objetos.</p>
<p className="p">The User function comes with a default prototype property, containing an object that starts out more or less empty. In this example, we add two methods to the User.prototype object: toString and checkPassword. When we create an instance of User with the new operator, the resultant object u gets the object stored at User.prototype automatically assigned as its prototype object. Figure 4.1 shows a diagram of these objects.</p>
<p className="it">Observe la flecha que vincula el objeto de instancia u al objeto de prototipo User.prototype. Este enlace describe la relación de herencia. Las búsquedas de propiedades comienzan buscando las propias propiedades del objeto; Por ejemplo, u.name y u.passwordHash devuelven los valores actuales de propiedades inmediatas de u. Las propiedades que no se encuentran directamente en u se buscan en el prototipo de u. El acceso a u.checkPassword, por ejemplo, recupera un método almacenado en User.prototype.</p>
<p className="p">Notice the arrow linking the instance object u to the prototype object User.prototype. This link describes the inheritance relationship. Property lookups start  by  searching  the  object’s  own  properties; for  example, u.name and u.passwordHash return the current values  of immediate properties of u. Properties not found directly on u are looked up in u’s prototype. Accessing u.checkPassword, for example, retrieves a method stored in User.prototype.</p>
<p className="it">Esto nos lleva al siguiente punto de nuestra lista. Mientras que la propiedad prototipo de una función constructora se utiliza para configurar la relación de prototipo de nuevas instancias, la función ES5 Object.getPrototypeOf () se puede utilizar para recuperar el prototipo de un objeto existente. Así, por ejemplo, después de crear el objeto u en el ejemplo anterior, podemos probar:</p>
<p className="p">This leads us to the next item in our list. Whereas the prototype property of a constructor function is used to set up the prototype relationship of new instances, the ES5 function Object.getPrototypeOf() can be used to retrieve the prototype of an existing object. So, for example, after we create the object u in the example above, we can test:</p>
<pre><code>
Object.getPrototypeOf(u) === User.prototype; // true</code></pre>
<p className="it">Figura 4.1 Relaciones de prototipo para el constructor e instancia de usuario</p>
<p className="p">Figure 4.1 Prototype relationships for the User constructor and instance</p>
<p className="it">Algunos entornos producen un mecanismo no estándar para recuperar el prototipo de un objeto a través de una propiedad __proto__ especial. Esto puede ser útil como un stopgap para entornos que no soportan Object.getPrototypeOf de ES5. En tales ambientes, podemos probar de manera similar:</p>
<p className="p">Some environments produce a nonstandard mechanism for retrieving the prototype of an object via a special __proto__ property. This can be useful as a stopgap for environments that do not support ES5’s Object.getPrototypeOf. In such environments, we can similarly test:</p>
<pre><code>u. proto === User.prototype; // true</code></pre>
<p className="it">Una nota final sobre las relaciones de prototipo: Los programadores de JavaScript a menudo describen al Usuario como una clase, aunque consiste en poco más que una función. Las clases en JavaScript son esencialmente la combinación de una función constructora (Usuario) y un objeto prototipo utilizado para compartir métodos entre instancias de la clase (User.prototype).</p>
<p className="p">A final note about prototype relationships: JavaScript programmers will often describe User as a class, even though it consists of little more than a function. Classes in JavaScript are essentially the combination of a constructor function (User) and a prototype object used to share methods between instances of the class (User.prototype).</p>
<p className="it">Figura 4.2 Vista conceptual de la "clase" de usuario</p>
<p className="p">Figure 4.2 Conceptual view of the User “class”</p>
<p className="it">La figura 4.2 proporciona una buena manera de pensar conceptualmente en la clase de usuario. La función User proporciona un constructor público para la clase y User.prototype es una implementación interna de los métodos compartidos entre instancias. Usos ordinarios de usuario y u no tienen necesidad de acceder directamente al objeto prototipo.</p>
<p className="p">Figure 4.2 provides a good way to think about the User class conceptually. The User function provides a public constructor for the class, and User.prototype is an internal implementation of the methods shared between instances. Ordinary uses of User and u have no need to access the prototype object directly.</p>
<h3>Things to Remember</h3>
<p className="it">C.prototype determina el prototipo de objetos creados por el nuevo C ().</p>
<p className="p">C.prototype determines the prototype of objects created by new C().</p>
<p className="it">Object.getPrototypeOf (obj) es la función ES5 estándar para recuperar el prototipo de un objeto.</p>
<p className="p">Object.getPrototypeOf(obj) is the standard ES5 function for retrieving the prototype of an object.</p>
<p className="it">Obj .__ proto__ es un mecanismo no estándar para recuperar el prototipo de un objeto.</p>
<p className="p">obj.__proto__ is a nonstandard mechanism for retrieving the prototype of an object.</p>
<p className="it">Una clase es un patrón de diseño que consiste en una función constructora y un prototipo asociado.</p>
<p className="p">A class is a design pattern consisting of a constructor function and an associated prototype.</p>
<h3>Item 31: Prefer Object.getPrototypeOf to __proto__</h3>
<p className="it">ES5 introdujo Object.getPrototypeOf como la API estándar para recuperar el prototipo de un objeto, pero sólo después de que varios motores de JavaScript hubieran proporcionado la propiedad __proto__ especial para el mismo propósito. No todos los entornos JavaScript soportan esta extensión, sin embargo, y los que lo hacen no son totalmente compatibles. Los entornos difieren, por ejemplo, en el tratamiento de objetos con un prototipo nulo. En algunos entornos, __proto__ se hereda de <code>Object.prototype</code>, por lo que un objeto con un prototipo nulo no tiene ninguna propiedad __proto__ especial:</p>
<p className="p">ES5 introduced Object.getPrototypeOf as the standard API for retrieving an object’s prototype, but only after a number of JavaScript engines had long provided the special __proto__ property for the same purpose. Not all JavaScript environments support this extension, however, and those that do are not entirely compatible. Environments differ, for example, on the treatment of objects with a null prototype. In some environments, __proto__ is inherited from <code>Object.prototype</code>, so an object with a null prototype has no special __proto__ property:</p>
<pre><code>var empty = Object.create(null); // object with no prototype<br></br>
  proto " in empty; // false (in some environments)</code></pre>
<p className="it">En otros, __proto__ siempre se maneja especialmente, independientemente del estado de un objeto:</p>
<p className="p">In others, __proto__ is always handled specially, regardless of an object’s state:</p>
<pre><code>var empty = Object.create(null); // object with no prototype<br></br>
  proto " in empty; // true (in some environments)</code></pre>
<p className="it">Dondequiera que Object.getPrototypeOf esté disponible, es el enfoque más estándar y portátil para extraer prototipos. Además, la propiedad __proto__ conduce a una serie de errores debido a su contaminación de todos los objetos (véase el ítem 45). Los motores JavaScript que actualmente soportan la extensión pueden elegir en el futuro para permitir que los programas lo deshabiliten para evitar estos errores. Preferir Object.getPrototypeOf asegura que el código continuará funcionando aunque __proto__ esté deshabilitado.</p>
<p className="p">Wherever Object.getPrototypeOf is available, it is the more standard and portable approach to extracting prototypes. Moreover, the __proto__ property leads to a number of bugs due to its pollution of all objects (see Item 45). JavaScript engines that currently support the extension may choose in the future to allow programs to disable it in order to avoid these bugs. Preferring Object.getPrototypeOf ensures that code will continue to work even if __proto__ is disabled.</p>
<p className="it">Para los entornos de JavaScript que no proporcionan la API de ES5, es fácil de implementar en términos de __proto__:</p>
<p className="p">For JavaScript environments that do not provide the ES5 API, it is easy to implement in terms of __proto__:</p>
<pre><code>		 if (typeof Object.getPrototypeOf === "undefined") &#123; Object.getPrototypeOf = function(obj) &#123;<br></br>
var t = typeof obj;<br></br>
if (!obj || (t !== "object" && t !== "function")) &#123;<br></br>
throw new TypeError("not an object");<br></br>
&#125;<br></br>
return obj. proto ;<br></br>
&#125;;<br></br>
&#125;</code></pre>
<p className="it">Esta implementación es segura para incluir en entornos ES5, ya que evita la instalación de la función si ya existe Object.getPrototypeOf.</p>
<p className="p">This implementation is safe to include in ES5 environments, because it avoids installing the function if Object.getPrototypeOf already exists.</p>
<h3>Things to Remember</h3>
<p className="it">Preferir el Object.getPrototypeOf compatible con los estándares a la propiedad __proto__ no estándar.</p>
<p className="p">Prefer the standards-compliant Object.getPrototypeOf to the nonstandard __proto__ property.</p>
<p className="it">Implementar Object.getPrototypeOf en entornos no ES5 que admitan __proto__.</p>
<p className="p">Implement Object.getPrototypeOf in non-ES5 environments that support __proto__.</p>
<h3>Item 32: Never Modify __proto__</h3>
<p className="it">La propiedad __proto__ especial proporciona una potencia adicional que Object.getPrototypeOf no: la capacidad de modificar el enlace de prototipo de un objeto. Si bien este poder puede parecer inocuo (después de todo, es sólo otra propiedad, ¿verdad?), En realidad tiene serias implicaciones y debe evitarse. La razón más obvia para evitar modificar</p>
<p className="p">The special __proto__ property provides an additional power that Object.getPrototypeOf does not: the ability to modify an object’s prototype link. While this power may seem innocuous (after all, it’s just another property, right?), it actually has serious implications  and should be avoided. The most obvious reason to avoid modifying</p>
<p className="it">__proto__ es portabilidad: Puesto que no todas las plataformas soportan la capacidad de cambiar el prototipo de un objeto, simplemente no puedes escribir código portátil que lo haga.</p>
<p className="p">__proto__ is portability: Since not all platforms support the ability to change an object’s prototype you simply can’t write portable code that does it.</p>
<p className="it">Otra razón para evitar modificar __proto__ es el rendimiento. Todos los motores de JavaScript modernos optimizan en gran medida el acto de obtener y configurar las propiedades del objeto, ya que son algunas de las operaciones más comunes que realizan los programas JavaScript. Estas optimizaciones se basan en el conocimiento del motor de la estructura de un objeto. Cuando cambia la estructura interna del objeto, digamos, al agregar o quitar propiedades al objeto o un objeto en su cadena de prototipos, algunas de estas optimizaciones se invalidan. Modificar __proto__ cambia realmente la propia estructura de herencia, que es el cambio más destructivo posible. Esto puede invalidar muchas más optimizaciones que las modificaciones a propiedades normales.</p>
<p className="p">Another reason to avoid modifying __proto__ is performance. All modern JavaScript engines heavily optimize the act of getting and setting object properties, since these are some of the most common operations that JavaScript programs perform. These optimizations are built on the engine’s knowledge of the structure of an object. When you change the object’s internal structure, say, by adding or removing properties to the object or an object in its prototype chain, some of these optimizations are invalidated. Modifying __proto__ actually changes the inheritance structure itself, which is the most destructive change possible. This can invalidate many more optimizations than modifications to ordinary properties.</p>
<p className="it">Pero la mayor razón para evitar modificar __proto__ es para mantener un comportamiento predecible. La cadena de prototipos de un objeto define su comportamiento determinando su conjunto de propiedades y valores de propiedad. La modificación del vínculo prototipo de un objeto es como darle un trasplante de cerebro: Cambia la jerarquía de herencia entera del objeto. Puede ser posible imaginar situaciones excepcionales donde tal operación podría ser útil, pero como una cuestión de sanidad básica, una jerarquía de herencia debe permanecer estable.</p>
<p className="p">But the biggest reason to avoid modifying __proto__ is for maintaining predictable behavior. An object’s prototype chain defines its behavior by determining its set of properties and property values. Modifying an object’s prototype link is like giving it a brain transplant: It swaps the object’s entire inheritance hierarchy. It may be possible to imagine exceptional situations where such an operation could be helpful, but as a matter of basic sanity, an inheritance hierarchy should remain stable.</p>
<p className="it">Para crear objetos nuevos con un vínculo de prototipo personalizado, puede usar Object.create de ES5. Para entornos que no implementan ES5, Item 33 proporciona una implementación portátil de Object.create que no depende de __proto__.</p>
<p className="p">For creating new objects with a custom prototype link, you can use ES5’s Object.create. For environments that do not implement ES5, Item 33 provides a portable implementation of Object.create that does not rely on __proto__.</p>
<h3>Things to Remember</h3>
<p className="it">Nunca modifique la propiedad __proto__ de un objeto.</p>
<p className="p">Never modify an object’s __proto__ property.</p>
<p className="it">Utilice Object.create para proporcionar un prototipo personalizado para los objetos nuevos.</p>
<p className="p">Use Object.create to provide a custom prototype for new objects.</p>
<h3>Item 33: Make Your Constructors new-Agnostic</h3>
<p className="it">Cuando crea un constructor como la función de usuario en el elemento 30, confía en que los llamantes recuerden llamarlo con el nuevo operador. Observe cómo la función supone que el receptor es un objeto completamente nuevo:</p>
<p className="p">When you create a constructor such as the User function in Item 30, you rely on callers to remember to call it with the new operator. Notice how the function assumes that the receiver is a brand-new object:</p>
<pre><code>		 function User(name, passwordHash) &#123; this.name = name; this.passwordHash = passwordHash;<br></br>
&#125;</code></pre>
<p className="it">Si un llamador olvida la nueva palabra clave, entonces el receptor de la función se convierte en el objeto global:</p>
<p className="p">If a caller forgets the new keyword, then the function’s receiver becomes the global object:</p>
<pre><code>		 var u = User("baravelli", "d8b74df393528d51cd19980ae0aa028e"); u;	// undefined<br></br>
this.name;	// "baravelli"<br></br>
this.passwordHash; // "d8b74df393528d51cd19980ae0aa028e"</code></pre>
<p className="it">No sólo la función devuelve inútilmente indefinida, también crea desastrosamente (o modifica, si ya existen) el nombre de las variables globales y la contraseñaHash.</p>
<p className="p">Not only does the function uselessly return undefined, it also disastrously creates (or modifies, if they happen to exist already) the global variables name and passwordHash.</p>
<p className="it">Si la función de usuario se define como código estricto ES5, el receptor predeterminado es indefinido:</p>
<p className="p">If the User function is defined as ES5 strict code, then the receiver defaults to undefined:</p>
<pre><code>		 function User(name, passwordHash) &#123; "use strict";<br></br>
this.name = name;<br></br>
this.passwordHash = passwordHash;<br></br>
&#125;<br></br>
pipipi<br></br>
var u = User("baravelli", "d8b74df393528d51cd19980ae0aa028e");<br></br>
// error: this is undefined</code></pre>
<p className="it">En este caso, la llamada defectuosa conduce a un error inmediato: La primera línea de Usuario intenta asignar a this.name, que lanza un TypeError. Por lo tanto, al menos con una estricta función constructora, la persona que llama puede descubrir rápidamente el error y arreglarlo.</p>
<p className="p">In this case, the faulty call leads to an immediate error: The first line of User attempts to assign to this.name, which throws a TypeError. So, at least with a strict constructor function, the caller can quickly discover the bug and fix it.</p>
<p className="it">Sin embargo, en cualquier caso, la función de usuario es frágil. Cuando se utiliza con nuevo funciona como se espera, pero cuando se utiliza como una función normal, falla. Un acercamiento más robusto es proporcionar una función que trabaje como constructor no importa cómo se llama. Una manera fácil de implementar esto es comprobar que el valor del receptor es una instancia adecuada de Usuario:</p>
<p className="p">Still, in either case, the User function is fragile. When used with new it works as expected, but when used as a normal function it fails. A more robust approach is to provide a function that works as a constructor no matter how it’s called. An easy way to implement this is to check that the receiver value is a proper instance of User:</p>
<pre><code>		 function User(name, passwordHash) &#123;<br></br>
if (!(this instanceof User)) &#123;<br></br>
return new User(name, passwordHash);<br></br>
&#125;<br></br>
this.name = name;<br></br>
this.passwordHash = passwordHash;<br></br>
&#125;</code></pre>
<p className="it">De esta manera, el resultado de llamar a User es un objeto que hereda de User.prototype, independientemente de si se llama como una función o como un constructor:</p>
<p className="p">This way, the result of calling User is an object that inherits from User.prototype, regardless of whether it’s called as a function or as a constructor:</p>
<pre><code>		 var x = User("baravelli", "d8b74df393528d51cd19980ae0aa028e");<br></br>
var y = new User("baravelli",<br></br>
"d8b74df393528d51cd19980ae0aa028e"); x instanceof User; // true<br></br>
y instanceof User; // true</code></pre>
<p className="it">Una desventaja de este patrón es que requiere una llamada de función adicional, por lo que es un poco más caro. También es difícil de usar para funciones variádicas (vea los ítems 21 y 22), ya que no hay un análogo directo al método de aplicación para llamar a funciones variadicas como constructores. Un enfoque algo más exótico hace uso de Object.create de ES5:</p>
<p className="p">One downside to this pattern is that it requires an extra function call, so it is a bit more expensive. It’s also hard to use for variadic functions (see Items 21 and 22), since there is no straightforward analog to the apply method for calling variadic functions as constructors. A somewhat more exotic approach makes use of ES5’s Object.create:</p>
<pre><code>		 function User(name, passwordHash) &#123;<br></br>
var self = this instanceof User<br></br>
? this<br></br>
: Object.create(User.prototype); self.name = name;<br></br>
self.passwordHash = passwordHash;<br></br>
pipipi<br></br>
pipipi<br></br>
return self;<br></br>
&#125;</code></pre>
<p className="it">Object.create toma un objeto prototipo y devuelve un nuevo objeto que hereda de él. Por lo tanto, cuando se llama a esta versión de User como una función, el resultado es un nuevo objeto heredado de User.prototype, con las propiedades de nombre y passwordHash inicializadas.</p>
<p className="p">Object.create takes a prototype object and returns a new object that inherits from it. So when this version of User is called as a function, the result is a new object inheriting from User.prototype, with the name and passwordHash properties initialized.</p>
<p className="it">Aunque Object.create sólo está disponible en ES5, puede ser aproximado en entornos más antiguos al crear un constructor local e instanciarlo con new:</p>
<p className="p">While Object.create is only available in ES5, it can be approximated in older environments by creating a local constructor and instantiating it with new:</p>
<pre><code>		 if (typeof Object.create === "undefined") &#123; Object.create = function(prototype) &#123;<br></br>
function C() &#123; &#125; C.prototype = prototype; return new C();<br></br>
&#125;;<br></br>
&#125;</code></pre>
<p className="it">(Tenga en cuenta que esto sólo implementa la versión de argumento único de Object.create.La versión real también acepta un segundo argumento opcional que describe un conjunto de descriptores de propiedad para definir en el nuevo objeto.)</p>
<p className="p">(Note that this only implements the single-argument version of Object.create. The real version also accepts an optional second argument that describes a set of property descriptors to define on the new object.)</p>
<p className="it">¿Qué pasa si alguien llama a esta nueva versión de Usuario con nuevo? Gracias al patrón de anulación del constructor, se comporta como lo hace con una llamada de función. Esto funciona porque JavaScript permite que el resultado de una nueva expresión sea reemplazado por un retorno explícito de una función constructora. Cuando el usuario devuelve el self, el resultado de la nueva expresión se convierte en self, que puede ser un objeto diferente del que está vinculado a éste.</p>
<p className="p">What happens if someone calls this new version of User with new? Thanks to the constructor override pattern, it behaves just like it  does with a function call. This works because JavaScript allows the result of a new expression to be overridden by an explicit return from a constructor function. When User returns self, the result of the new expression becomes self, which may be a different object from the one bound to this.</p>
<p className="it">Proteger a un constructor contra el mal uso no siempre puede valer la pena, especialmente cuando sólo está usando un constructor localmente. Aún así, es importante entender cómo las cosas pueden salir mal si un constructor se llama de manera incorrecta. Por lo menos, es importante documentar cuándo una función de constructor espera ser llamada con new, especialmente cuando se comparte a través de una base de código grande o desde una biblioteca compartida.</p>
<p className="p">Protecting a constructor against misuse may not  always be worth  the trouble, especially when you are only using a constructor locally. Still, it’s important to understand how badly things can go wrong if a constructor is called in the wrong way. At the very least, it’s important to document when a constructor function expects to be called with new, especially when sharing it across a large codebase or from a shared library.</p>
<h3>Things to Remember</h3>
<p className="it">Hacer un constructor agnóstico de la sintaxis de su interlocutor invirtiendo a sí mismo con nuevo o con Object.create.</p>
<p className="p">Make a constructor agnostic to its caller’s syntax by reinvoking itself with new or with Object.create.</p>
<p className="it">Documente claramente cuando una función espera ser llamada con new.</p>
<p className="p">Document clearly when a function expects to be called with new.</p>
<h3>Item 34: Store Methods on Prototypes</h3>
<p className="it">Es perfectamente posible programar en JavaScript sin prototipos. Podríamos implementar la clase Usuario a partir de la Partida 30 sin definir nada especial en su prototipo:</p>
<p className="p">It’s perfectly possible to program in JavaScript without prototypes. We could implement the User class from Item 30 without defining anything special in its prototype:</p>
<pre><code>		 function User(name, passwordHash) &#123; this.name = name; this.passwordHash = passwordHash; this.toString = function() &#123;<br></br>
return "[User " + this.name + "]";<br></br>
&#125;;<br></br>
this.checkPassword = function(password) &#123;<br></br>
return hash(password) === this.passwordHash;<br></br>
&#125;;<br></br>
&#125;</code></pre>
<p className="it">Para la mayoría de los propósitos, esta clase se comporta prácticamente igual que su implementación original. Pero cuando construimos varias instancias de Usuario, surge una diferencia importante:</p>
<p className="p">For most purposes, this class behaves pretty much the same as its original implementation. But when we construct several instances of User, an important difference emerges:</p>
<pre><code>		 var u1 = new User(/ ... /); var u2 = new User(/ ... /); var u3 = new User(/ ... /);</code></pre>
<p className="it">La figura 4.3 muestra cómo se ven estos tres objetos y su objeto prototipo. En lugar de compartir los métodos toString y checkPassword a través del prototipo, cada instancia contiene una copia de ambos métodos, para un total de seis objetos de función.</p>
<p className="p">Figure 4.3 shows what these three objects and their prototype object look like. Instead of sharing the toString and checkPassword methods via the prototype, each instance contains a copy of both methods, for a total of six function objects.</p>
<p className="it">Por el contrario, la Figura 4.4 muestra cómo se ven estos tres objetos y su objeto prototipo usando la definición original. Los métodos toString y checkPassword se crean una vez y se comparten entre todas las instancias a través de su prototipo.</p>
<p className="p">By contrast, Figure 4.4 shows what these three objects and their prototype object look like using the original definition. The toString and checkPassword methods are created once and shared between all instances through their prototype.</p>
<p className="it">Los métodos de almacenamiento en un prototipo los ponen a disposición de todas las instancias sin necesidad de múltiples copias de las funciones que las implementan o propiedades adicionales en cada objeto de instancia. Es de esperar que los métodos de almacenamiento de objetos de instancia puedan optimizar la velocidad de las búsquedas de métodos como u3.toString (), ya que no tiene que buscar en la cadena de prototipos para encontrar la implementación de toString. Sin embargo, los motores JavaScript modernos optimizan mucho las búsquedas de prototipos, por lo que los métodos de copia en objetos de instancia no están necesariamente garantizados para proporcionar mejoras en la velocidad. Y los métodos de instancia son casi seguros de utilizar más memoria que los métodos de prototipo.</p>
<p className="p">Storing methods on a prototype makes them available to all instances without requiring multiple copies of the functions that implement them or extra properties on each instance object. You might expect that storing methods on instance objects could optimize the speed of method lookups such as u3.toString(), since it doesn’t have to search the prototype chain to find the implementation of toString. However, modern JavaScript engines heavily optimize prototype lookups, so copying methods onto instance objects is not necessarily guaranteed to provide noticeable speed improvements. And instance methods are almost certain to use more memory than prototype methods.</p>
<p className="it">Figura 4.3 Almacenamiento de métodos en objetos de instancia</p>
<p className="p">Figure 4.3 Storing methods on instance objects</p>
<p className="it">Figura 4.4 Almacenamiento de métodos en un objeto prototipo</p>
<p className="p">Figure 4.4 Storing methods on a prototype object</p>
<h3>Things to Remember</h3>
<p className="it">Almacenar métodos en objetos de instancia crea varias copias de las funciones, un objeto por instancia.</p>
<p className="p">Storing methods on instance objects creates multiple copies of the functions, one per instance object.</p>
<p className="it">Prefieren almacenar métodos en prototipos sobre almacenarlos en objetos de instancia.</p>
<p className="p">Prefer storing methods on prototypes over storing them on instance objects.</p>
<h3>Item 35: Use Closures to Store Private Data</h3>
<p className="it">El sistema de objetos de JavaScript no estimula o impone la ocultación de la información. El nombre de cada propiedad es una cadena, y cualquier pieza de un programa puede tener acceso a cualquiera de las propiedades de un objeto simplemente pidiéndole por su nombre. Funciones como por ejemplo ... in loops y las funciones Object.keys () y Object.getOwnPropertyNames () de ES5 incluso facilitan el aprendizaje de todos los nombres de propiedades de un objeto.</p>
<p className="p">JavaScript’s object system does not particularly encourage or enforce information hiding. The name of every property is a string, and any piece of a program can get access to any of the properties of an object simply by asking for it by name. Features such as for...in loops and ES5’s Object.keys() and Object.getOwnPropertyNames() functions even make it easy to learn all the property names of an object.</p>
<p className="it">A menudo, los programadores de JavaScript recurrir a las convenciones de codificación en lugar de cualquier mecanismo de aplicación absoluta para las propiedades privadas. Por ejemplo, algunos programadores usan convenciones de nomenclatura tales como prefijar o sufijo nombres de propiedad privada con un carácter de subrayado (_). Esto no hace nada para reforzar la ocultación de la información, pero sugiere a los usuarios con buen comportamiento de un objeto que no deben inspeccionar o modificar la propiedad para que el objeto pueda permanecer libre para cambiar su implementación.</p>
<p className="p">Often, JavaScript programmers resort to coding conventions rather than any absolute enforcement mechanism for private properties. For example, some programmers use naming conventions such as prefixing or suffixing private property names with an underscore character (_). This does nothing to enforce information hiding, but it suggests  to well-behaved users of an object that they should not inspect or modify the property so that the object can remain free to change its implementation.</p>
<p className="it">Sin embargo, algunos programas realmente exigen un mayor grado de ocultación. Por ejemplo, una plataforma o marco de aplicación sensible a la seguridad puede desear enviar un objeto a una aplicación no confiable sin riesgo de que la aplicación altere los elementos internos del objeto. Otra situación en la que la aplicación de la ocultación de información puede ser útil es en las bibliotecas muy utilizadas, donde pueden aparecer insectos sutiles cuando los usuarios descuidados dependen accidentalmente o interfieren con los detalles de la implementación.</p>
<p className="p">Nevertheless, some programs actually call for a higher degree of hiding. For example, a security-sensitive platform or application framework may wish to send an object to an untrusted application without risk of the application tampering with the internals of the object. Another situation where enforcement of information hiding can be useful is in heavily used libraries, where subtle bugs can crop up when careless users accidentally depend on or interfere with implementation details.</p>
<p className="it">Para estas situaciones, JavaScript proporciona un mecanismo muy fiable para ocultar la información: el cierre.</p>
<p className="p">For these situations, JavaScript does provide one very reliable mechanism for information hiding: the closure.</p>
<p className="it">Los cierres son una estructura de datos austera. Almacenan datos en sus variables cerradas sin proporcionar acceso directo a esas variables. La única manera de obtener acceso a los internos de un cierre es que la función proporcione acceso a él de forma explícita. En otras palabras, los objetos y los cierres tienen políticas opuestas: Las propiedades de un objeto se exponen automáticamente, mientras que las variables de un cierre se ocultan automáticamente.</p>
<p className="p">Closures are an austere data structure. They store data in their enclosed variables without providing direct access to those variables. The only way to gain access to the internals of a closure is for the function to provide access to it explicitly. In other words, objects and closures have opposite policies: The properties of an object are automatically exposed, whereas the variables in a closure are automatically hidden.</p>
<p className="it">Podemos aprovechar esto para almacenar datos verdaderamente privados en un objeto. En lugar de almacenar los datos como propiedades del objeto, lo almacenamos como variables en el constructor y volvemos los métodos del objeto en cierres que se refieren a esas variables. Revisemos nuevamente la clase Usuario del Item 30 una vez más:</p>
<p className="p">We can take advantage of this to store truly private data in an object. Instead of storing the data as properties of the object, we store it as variables in the constructor, and turn the methods of the object into closures that refer to those variables. Let’s revisit the User class from Item 30 once more:</p>
<pre><code>		 function User(name, passwordHash) &#123;<br></br>
this.toString = function() &#123;<br></br>
return "[User " + name + "]";<br></br>
&#125;;<br></br>
this.checkPassword = function(password) &#123;<br></br>
return hash(password) === passwordHash;<br></br>
&#125;;<br></br>
&#125;</code></pre>
<p className="it">Observe cómo, a diferencia de otras implementaciones, los métodos toString y checkPassword se refieren a nombre y passwordHash como variables, en lugar de como propiedades de este. Una instancia de Usuario ahora no contiene ninguna propiedad de instancia en absoluto, por lo que el código externo no tiene acceso directo al hash de nombre y contraseña de una instancia de Usuario.</p>
<p className="p">Notice how, unlike in other implementations, the toString and checkPassword methods refer to name and passwordHash as variables, rather than as properties of this. An instance of User now contains no instance properties at all, so outside code has no direct access to the name and password hash of an instance of User.</p>
<p className="it">Un inconveniente de este patrón es que, para que las variables del constructor estén en el alcance de los métodos que las utilizan, los métodos deben colocarse en el objeto de instancia. Así como se discutió el tema 34, esto puede conducir a una proliferación de copias de métodos. Sin embargo, en situaciones donde la cobertura de información garantizada es crítica, puede valer la pena el costo adicional.</p>
<p className="p">A downside to this pattern is that, in order for the variables of the constructor to be in scope of the methods that use them, the methods must be placed on the instance object. Just as Item 34 discussed, this can lead to a proliferation of copies of methods. Nevertheless, in situations where guaranteed information hiding is critical, it may be worth the additional cost.</p>
<h3>Things to Remember</h3>
<p className="it">Las variables de cierre son privadas, accesibles solamente a referencias locales.</p>
<p className="p">Closure variables are private, accessible only to local references.</p>
<p className="it">Utilice variables locales como datos privados para reforzar la ocultación de la información dentro de los métodos.</p>
<p className="p">Use local variables as private data to enforce information hiding within methods.</p>
<h3>Item 36: Store Instance State Only on Instance Objects</h3>
<p className="it">Entender la relación de uno a muchos entre un objeto prototipo y sus instancias es crucial para implementar objetos que se comportan correctamente. Una de las formas en que esto puede salir mal es almacenando accidentalmente datos por instancia en un prototipo. Por ejemplo, una clase que implementa una estructura de datos de árbol puede contener una matriz de niños para cada nodo. Poner la matriz de los niños en el objeto prototipo conduce a una implementación completamente roto:</p>
<p className="p">Understanding the one-to-many relationship between a prototype object and its instances is crucial to implementing objects that behave correctly. One of the ways this can go wrong is by accidentally storing per-instance data on a prototype. For example, a class implementing a tree data structure might contain an array of children for each node. Putting the array of children on the prototype object leads to a completely broken implementation:</p>
<pre><code>		 function Tree(x) &#123;<br></br>
this.value = x;<br></br>
&#125;<br></br>
Tree.prototype = &#123;<br></br>
children: [],	// should be instance state!<br></br>
addChild: function(x) &#123;<br></br>
this.children.push(x);<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">Considere lo que sucede cuando tratamos de construir un árbol con esta clase:</p>
<p className="p">Consider what happens when we try to construct a tree with this class:</p>
<pre><code>		 var left = new Tree(2); left.addChild(1); left.addChild(3);<br></br>
pipipi<br></br>
var right = new Tree(6); right.addChild(5); right.addChild(7);<br></br>
pipipi<br></br>
var top = new Tree(4); top.addChild(left); top.addChild(right);<br></br>
pipipi<br></br>
top.children; // [1, 3, 5, 7, left, right]</code></pre>
<p className="it">Cada vez que llamamos addChild, agregamos un valor a Tree.prototype</p>
<p className="p">Each time we call addChild, we append a value to Tree.prototype</p>
<p className="it">.children, que contiene los nodos en el orden de las llamadas a addChild en cualquier lugar! Esto deja los objetos Tree en el estado incoherente mostrado en la Figura 4.5.</p>
<p className="p">.children, which contains the nodes in the order of any calls to addChild anywhere! This leaves the Tree objects in the incoherent state shown in Figure 4.5.</p>
<p className="it">La forma correcta de implementar la clase Tree es crear una matriz de hijos separados para cada objeto de instancia:</p>
<p className="p">The correct way to implement the Tree class is to create a separate children array for each instance object:</p>
<pre><code>		 function Tree(x) &#123;<br></br>
this.value = x;<br></br>
this.children = []; // instance state<br></br>
&#125;<br></br>
Tree.prototype = &#123; addChild: function(x) &#123;<br></br>
this.children.push(x);<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">Ejecutando el mismo código de ejemplo anterior, obtenemos el estado esperado, mostrado en la Figura 4.6.</p>
<p className="p">Running the same example code above, we get the expected state, shown in Figure 4.6.</p>
<p className="it">Figura 4.5 Almacenamiento del estado de la instancia en un objeto prototipo</p>
<p className="p">Figure 4.5 Storing instance state on a prototype object</p>
<p className="it">Figura 4.6 Almacenamiento del estado de instancia en objetos de instancia</p>
<p className="p">Figure 4.6 Storing instance state on instance objects</p>
<p className="it">La moraleja de esta historia es que los datos con estado pueden ser problemáticos cuando se comparten. Los métodos son generalmente seguros compartiendo entre múltiples instancias de una clase porque son típicamente apátridas, aparte de referirse al estado de la instancia a través de referencias a esto. (Puesto que la sintaxis de la llamada del método asegura que esto está enlazado al objeto de la instancia incluso para un método heredado de un prototipo, los métodos compartidos pueden todavía tener acceso al estado de la instancia.) En general, cualquier información inmutable es segura para compartir en un prototipo, Puede, en principio, ser almacenado en un prototipo, también, siempre y cuando realmente está destinado a ser compartido. Pero los métodos son con mucho los datos más comunes encontrados en objetos prototipo. El estado por instancia, por su parte, debe almacenarse en objetos de instancia.</p>
<p className="p">The moral of this story is that stateful data  can be  problematic when shared. Methods are generally safe to share between multiple instances of a class because they are typically stateless, other than referring to instance state via references to this. (Since the method call syntax ensures that this is bound to the instance object even for a method inherited from a prototype, shared methods can still access instance state.) In general, any immutable data is safe to share on a prototype, and stateful data can in principle be stored on a prototype, too, so long as it’s truly intended to be shared. But methods are by far the most common data found on prototype objects. Per-instance state, meanwhile, must be stored on instance objects.</p>
<h3>Things to Remember</h3>
<p className="it">Los datos mutables pueden ser problemáticos cuando se comparten, y los prototipos se comparten entre todas sus instancias.</p>
<p className="p">Mutable data can be problematic when shared, and prototypes are shared between all their instances.</p>
<p className="it">Almacene el estado mutable por instancia en objetos de instancia.</p>
<p className="p">Store mutable per-instance state on instance objects.</p>
<h3>Item 37: Recognize the Implicit Binding of this</h3>
<p className="it">El formato de archivo CSV (valores separados por comas) es una representación de texto simple para datos tabulares:</p>
<p className="p">The CSV (comma-separated values) file format is a simple text representation for tabular data:</p>
<p className="it">Bösendorfer, 1828, Viena, Austria Fazioli, 1981, Sacile, Italia Steinway, 1853, Nueva York, Estados Unidos</p>
<p className="p">Bösendorfer,1828,Vienna,Austria Fazioli,1981,Sacile,Italy Steinway,1853,New York,USA</p>
<p className="it">Podemos escribir una clase simple y personalizable para leer datos CSV. (Para simplificar, dejaremos de lado la posibilidad de analizar entradas citadas como "hola, mundo"). A pesar de su nombre, CSV viene en diferentes variedades permitiendo diferentes caracteres para separadores. Por lo tanto, nuestro constructor toma una matriz opcional de caracteres separadores y construye una expresión regular personalizada que se utiliza para dividir cada línea en entradas:</p>
<p className="p">We can write a simple, customizable class for reading CSV data. (For simplicity, we’ll leave off the ability to parse quoted entries such as "hello, world".) Despite its name, CSV comes in different varieties allowing different characters for separators. So our constructor takes an optional array of separator characters and constructs a custom regular expression to use for splitting each line into entries:</p>
<pre><code>		 function CSVReader(separators) &#123; this.separators = separators || [","]; this.regexp =<br></br>
new RegExp(this.separators.map(function(sep) &#123;<br></br>
return "\\" + sep[0];<br></br>
&#125;).join("|"));<br></br>
&#125;</code></pre>
<p className="it">Una simple implementación de un método de lectura puede proceder en dos pasos: Primero, divida la cadena de entrada en una matriz de líneas individuales; En segundo lugar, dividir cada línea de la matriz en células individuales. El resultado debe ser un arreglo bidimensional de cadenas. Este es un trabajo perfecto para el método de mapa:</p>
<p className="p">A simple implementation of a read method can proceed in two steps: First, split the input string into an array of individual lines; second, split each line of the array into individual cells. The result should then be a two-dimensional array of strings. This is a perfect job for the map method:</p>
<pre><code>		 CSVReader.prototype.read = function(str) &#123; var lines = str.trim().split(/\n/); return lines.map(function(line) &#123;<br></br>
return line.split(this.regexp); // wrong this!<br></br>
&#125;);<br></br>
&#125;;<br></br>
pipipi<br></br>
var reader = new CSVReader(); reader.read("a,b,c\nd,e,f\n"); // [["a,b,c"], ["d,e,f"]]</code></pre>
<p className="it">Este código aparentemente simple tiene un fallo importante pero sutil: La devolución de llamada pasada a lines.map se refiere a esto, esperando extraer la propiedad regexp del objeto CSVReader. Pero el mapa vincula el receptor de su devolución de llamada a la matriz de líneas, que no tiene tal propiedad. El resultado: this.regexp produce undefined, y la llamada a <code>line.split</code>devuelve.</p>
<p className="p">This seemingly simple code has a major but subtle bug: The callback passed to lines.map refers to this, expecting to extract the regexp property of the CSVReader object. But map binds its callback’s receiver to the lines array, which has no such property. The result: this.regexp produces undefined, and the call to <code>line.split</code> goes haywire.</p>
<p className="it">Este error es el resultado del hecho de que esto está ligado de una manera diferente a las variables. Como explican los ítems 18 y 25, cada función tiene un enlace implícito de esto, cuyo valor se determina cuando se llama a la función. Con una variable de alcance léxico, siempre puede indicar dónde recibe su enlace buscando una aparición de enlace explícitamente nombrada del nombre: por ejemplo, en una lista de declaración var o como un parámetro de función. Por el contrario, esto está implícitamente unido por la función cercana más cercana. Así que la vinculación de esto en CSVReader.prototype.read es diferente de la vinculación de esto en la función de devolución de llamada pasó a lines.map.</p>
<p className="p">This bug is the result of the fact that this is bound in a different  way from variables. As Items 18 and 25 explain, every function has an implicit binding of this, whose value is determined when the function is called. With a lexically scoped variable, you can always tell where it receives its binding by looking for an explicitly named binding occurrence of the  name:  for  example,  in  a  var declaration list or as a function parameter. By contrast, this is implicitly bound by the nearest enclosing function. So the binding of this in CSVReader.prototype.read is different from the binding of this in the callback function passed to lines.map.</p>
<p className="it">Afortunadamente, al igual que el ejemplo forEach en el ítem 25, podemos aprovechar el hecho de que el método map de arrays toma un segundo argumento opcional para usar como un enlace-this para la devolución de llamada. Así que en este caso, la solución más fácil es reenviar la vinculación externa de ésta a la devolución de llamada por medio del segundo argumento de mapa:</p>
<p className="p">Luckily, similar to the forEach example in Item 25, we can take advantage of the fact that the map method of arrays takes an optional second argument to use as a this-binding for the callback. So in this case, the easiest fix is to forward the outer binding of this to the callback by way of the second map argument:</p>
<pre><code>		 CSVReader.prototype.read = function(str) &#123; var lines = str.trim().split(/\n/); return lines.map(function(line) &#123;<br></br>
return line.split(this.regexp);<br></br>
&#125;, this); // forward outer this-binding to callback<br></br>
&#125;;<br></br>
pipipi<br></br>
var reader = new CSVReader(); reader.read("a,b,c\nd,e,f\n");<br></br>
// [["a","b","c"], ["d","e","f"]]</code></pre>
<p className="it">Ahora, no todas las API basadas en callback son tan consideradas. ¿Qué pasa si el mapa no acepta este argumento adicional? Necesitaríamos otra forma de retener el acceso a la función externa de este enlace para que la devolución de llamada todavía podría referirse a ella. La solución es bastante sencilla: Simplemente utilice una variable de alcance léxico para guardar una referencia adicional al enlace externo de esto:</p>
<p className="p">Now, not all callback-based APIs are so considerate. What if map did not accept this additional argument? We would need another way to retain access to the outer function’s this-binding so that the callback could still refer to it. The solution is straightforward enough: Just use a lexically scoped variable to save an additional reference to the outer binding of this:</p>
<pre><code>		 CSVReader.prototype.read = function(str) &#123;<br></br>
var lines = str.trim().split(/\n/);<br></br>
var self = this; // save a reference to outer this-binding<br></br>
return lines.map(function(line) &#123;<br></br>
return line.split(self.regexp); // use outer this<br></br>
&#125;);<br></br>
&#125;;<br></br>
pipipi<br></br>
var reader = new CSVReader(); reader.read("a,b,c\nd,e,f\n");<br></br>
// [["a","b","c"], ["d","e","f"]]</code></pre>
<p className="it">Los programadores suelen usar el nombre de la variable self para este patrón, señalando que el único propósito de la variable es como un alias adicional al ámbito actual de este enlace. La elección particular del nombre no es de gran importancia, pero el uso de un nombre común facilita que otros programadores reconozcan rápidamente el patrón.</p>
<p className="p">Programmers commonly use the variable name self for this pattern, signaling that the only purpose for the variable is as an extra alias to the current scope’s this-binding. (Other popular variable names for this pattern are me and that.) The particular choice of name is not of great importance, but using a common name makes it easier for other programmers to recognize the pattern quickly.</p>
<p className="it">Otro enfoque válido en ES5 es utilizar el método de enlace de la función de devolución de llamada, similar al método descrito en el punto 25:</p>
<p className="p">Yet another valid approach in ES5 is to use the callback function’s bind method, similar to the approach described in Item 25:</p>
<pre><code>		 CSVReader.prototype.read = function(str) &#123; var lines = str.trim().split(/\n/); return lines.map(function(line) &#123;<br></br>
return line.split(this.regexp);<br></br>
&#125;.bind(this)); // bind to outer this-binding<br></br>
&#125;;<br></br>
pipipi<br></br>
var reader = new CSVReader(); reader.read("a,b,c\nd,e,f\n");<br></br>
// [["a","b","c"], ["d","e","f"]]</code></pre>
<h3>Things to Remember</h3>
<p className="it">El alcance de esto siempre está determinado por su función cercana más cercana.</p>
<p className="p">The scope of this is always determined by its nearest enclosing function.</p>
<p className="it">Usa una variable local, usualmente llamada yo, yo, o eso, para hacer una</p>
<p className="p">Use a local variable, usually called self, me, or that, to make a</p>
<p className="it">Esta unión disponible para las funciones internas.</p>
<p className="p">this-binding available to inner functions.</p>
<h3>Item 38: Call Superclass Constructors from Subclass Constructors</h3>
<p className="it">Un gráfico de escena es una colección de objetos que describen una escena en un programa visual como un juego o una simulación gráfica. Una escena simple contiene una colección de todos los objetos de la escena, conocidos como actores, una tabla de datos de imagen precargados para los actores y una referencia a la presentación gráfica subyacente, a menudo conocida como el contexto:</p>
<p className="p">A scene graph is a collection of objects describing a scene in a visual program such as a game or graphical simulation. A simple scene contains a collection of all of the objects in the scene, known as actors,  a table of preloaded image data for the actors, and a reference to the underlying graphics display, often known as the context:</p>
<pre><code>		 function Scene(context, width, height, images) &#123;<br></br>
this.context = context; this.width = width; this.height = height; this.images = images; this.actors = [];<br></br>
&#125;<br></br>
pipipipipipi<br></br>
Scene.prototype.register = function(actor) &#123;<br></br>
this.actors.push(actor);<br></br>
&#125;;<br></br>
pipipi<br></br>
Scene.prototype.unregister = function(actor) &#123;<br></br>
var i = this.actors.indexOf(actor); if (i &#62;= 0) &#123;<br></br>
this.actors.splice(i, 1);<br></br>
&#125;<br></br>
&#125;;<br></br>
Scene.prototype.draw = function() &#123; this.context.clearRect(0, 0, this.width, this.height); for (var a = this.actors, i = 0, n = a.length;<br></br>
i &#60; n; i++) &#123;<br></br>
a[i].draw();<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">Todos los actores de una escena heredan de una clase de actor base, que abstrae métodos comunes. Cada actor almacena una referencia a su escena junto con las posiciones de coordenadas y luego se añade al registro de actores de la escena:</p>
<p className="p">All actors in a scene inherit from a base Actor class, which abstracts out common methods. Every actor stores a reference to its scene along with coordinate positions and then adds itself to the scene’s actor registry:</p>
<pre><code>		 function Actor(scene, x, y) &#123; this.scene = scene; this.x = x;<br></br>
this.y = y; scene.register(this);<br></br>
&#125;</code></pre>
<p className="it">Para permitir cambiar la posición de un actor en la escena, proporcionamos un método moveTo, que cambia sus coordenadas y luego vuelve a dibujar la escena:</p>
<p className="p">To enable changing an actor’s position in the scene, we provide a moveTo method, which changes its coordinates and then redraws the scene:</p>
<pre><code>		 Actor.prototype.moveTo = function(x, y) &#123;<br></br>
this.x = x;<br></br>
this.y = y;<br></br>
this.scene.draw();<br></br>
&#125;;</code></pre>
<p className="it">Cuando un actor abandona la escena, la eliminamos del registro del gráfico de la escena y redibujamos la escena:</p>
<p className="p">When an actor leaves the scene, we remove it from the scene graph’s registry and redraw the scene:</p>
<pre><code>		 Actor.prototype.exit = function() &#123; this.scene.unregister(this); this.scene.draw();<br></br>
&#125;;</code></pre>
<p className="it">Para dibujar un actor, buscamos su imagen en la tabla de imágenes de escenas gráficas. Asumiremos que cada actor tiene un campo de tipo que puede usarse para buscar su imagen en la tabla de imágenes. Una vez que tengamos estos datos de imagen, podemos dibujarlos en el contexto gráfico, usando la biblioteca de gráficos subyacente. (En este ejemplo se utiliza HTML Canvas API, que proporciona un método drawImage para dibujar un objeto Image en un elemento &lt;canvas&gt; de una página web).</p>
<p className="p">To draw an actor, we look up its image in the scene graph image table. We’ll assume that every actor has a type field that can be used to look up its image in the image table. Once we have this image data, we can draw it onto the graphics context, using the underlying graphics library. (This example uses the HTML Canvas API, which provides a drawImage method for drawing an Image object onto a &#60;canvas&#62; element in a web page.)</p>
<pre><code>		 Actor.prototype.draw = function() &#123;<br></br>
var image = this.scene.images[this.type]; this.scene.context.drawImage(image, this.x, this.y);<br></br>
&#125;;<br></br>
Similarly, we can determine an actor’s size from its image data:<br></br>
Actor.prototype.width = function() &#123;<br></br>
return this.scene.images[this.type].width;<br></br>
&#125;;<br></br>
pipipi<br></br>
Actor.prototype.height = function() &#123;<br></br>
return this.scene.images[this.type].height;<br></br>
&#125;;</code></pre>
<p className="it">Implementamos tipos específicos de actores como subclases de Actor. Por ejemplo, una nave espacial en un juego de arcade tendría una clase SpaceShip que extiende Actor. Al igual que todas las clases, SpaceShip se define como una función constructora. Sin embargo, para garantizar que las instancias de SpaceShip se inicialicen correctamente como actores, el constructor debe llamar explícitamente al constructor Actor. Hacemos esto invocando a Actor con el receptor ligado al nuevo objeto:</p>
<p className="p">We implement specific types of actors as subclasses of Actor. For example, a spaceship in an arcade game would have a SpaceShip class that extends Actor. Like all classes, SpaceShip is defined as a constructor function. But in order to ensure that instances of SpaceShip are properly initialized as actors, the constructor must explicitly call the Actor constructor. We do this by invoking Actor with the receiver bound to the new object:</p>
<pre><code>		 function SpaceShip(scene, x, y) &#123; Actor.call(this, scene, x, y); this.points = 0;<br></br>
&#125;</code></pre>
<p className="it">Al llamar primero al constructor Actor se asegura de que todas las propiedades de instancia creadas por Actor se añadan al nuevo objeto. Después de eso, SpaceShip puede definir sus propias propiedades de instancia, como el número de puntos actuales del barco.</p>
<p className="p">Calling the Actor constructor first ensures that all the instance properties created by Actor are added to the new object. After that, SpaceShip can define its own instance properties such as the ship’s current points count.</p>
<p className="it">Para que SpaceShip sea una subclase apropiada de Actor, su prototipo debe heredar de Actor.prototype. La mejor manera de hacer la extensión es con Object.create de ES5:</p>
<p className="p">In order for SpaceShip to be a proper subclass of Actor, its prototype must inherit from Actor.prototype. The best way to do the extension is with ES5’s Object.create:</p>
<pre><code>		 SpaceShip.prototype = Object.create(Actor.prototype);</code></pre>
<p className="it">(El ítem 33 describe una implementación de Object.create para entornos que no soportan ES5). Si hubiéramos intentado crear el prototipo de SpaceShip con el constructor Actor, habría varios problemas. El primer problema es que no tenemos argumentos razonables para pasar a Actor:</p>
<p className="p">(Item 33 describes an implementation of Object.create for environments that do not support ES5.) If we had tried to create SpaceShip’s prototype object with the Actor constructor, there would be several problems. The first problem is that we don’t have any reasonable arguments to pass to Actor:</p>
<pre><code>		 SpaceShip.prototype = new Actor();</code></pre>
<p className="it">Cuando inicializamos el prototipo SpaceShip, todavía no hemos creado ninguna escena para pasar como el primer argumento. Y el prototipo SpaceShip no tiene una coordenada x o y útil. Estas propiedades deben ser propiedades de instancia de objetos SpaceShip individuales, no propiedades de SpaceShip.prototype. Más problemático, el constructor Actor agrega el objeto al registro de la escena, lo que definitivamente no queremos hacer con el prototipo SpaceShip. Este es un fenómeno común con las subclases: El constructor de la superclase sólo debe ser invocado desde el constructor de la subclase, no al crear el prototipo de la subclase.</p>
<p className="p">When we initialize the SpaceShip prototype, we haven’t yet created any scenes to pass as the first argument. And the SpaceShip prototype doesn’t have a useful x or y coordinate. These properties should be instance properties of individual SpaceShip objects, not properties of SpaceShip.prototype. More problematically, the Actor constructor adds the object to the scene’s registry, which we definitely do not want to do with the SpaceShip prototype. This is a common phenomenon with subclasses: The superclass constructor should only be invoked from the subclass constructor, not when creating the subclass prototype.</p>
<p className="it">Una vez que hemos creado el objeto prototipo SpaceShip, podemos agregar todas las propiedades que son compartidas por instancias, incluyendo un nombre de tipo para indexar en la tabla de escenas de datos de imagen y métodos específicos para las naves espaciales.</p>
<p className="p">Once we’ve created the SpaceShip prototype object, we can add all the properties that are shared by instances, including a type name for indexing into the scene’s table of image data and methods specific to spaceships.</p>
<pre><code>		 SpaceShip.prototype.type = "spaceShip";<br></br>
pipipi<br></br>
SpaceShip.prototype.scorePoint = function() &#123;<br></br>
this.points++;<br></br>
&#125;;<br></br>
pipipi<br></br>
SpaceShip.prototype.left = function() &#123;<br></br>
this.moveTo(Math.max(this.x - 10, 0), this.y);<br></br>
&#125;;<br></br>
pipipi<br></br>
pipipi<br></br>
SpaceShip.prototype.right = function() &#123;<br></br>
var maxWidth = this.scene.width - this.width(); this.moveTo(Math.min(this.x + 10, maxWidth), this.y);<br></br>
&#125;;</code></pre>
<p className="it">La Figura 4.7 muestra un diagrama de la jerarquía de herencia para las instancias de SpaceShip. Observe cómo se definen las propiedades de escena, x e y</p>
<p className="p">Figure 4.7 shows a diagram of the inheritance hierarchy for instances of SpaceShip. Notice how the scene, x, and y properties are defined</p>
<p className="it">Figura 4.7 Una jerarquía de herencia con subclases sólo en el objeto de instancia, en lugar de en cualquier objeto de prototipo, a pesar de haber sido creado por el constructor Actor.</p>
<p className="p">Figure 4.7 An inheritance hierarchy with subclasses only on the instance object, rather than on any prototype object, despite being created by the Actor constructor.</p>
<h3>Things to Remember</h3>
<p className="it">Llame explícitamente al constructor de superclases de constructores de subclases, pasando esto como el receptor explícito.</p>
<p className="p">Call the superclass constructor explicitly from subclass constructors, passing this as the explicit receiver.</p>
<p className="it">Utilice Object.create para construir el objeto de prototipo de subclase para evitar llamar al constructor de superclase.</p>
<p className="p">Use Object.create to construct the subclass prototype object to avoid calling the superclass constructor.</p>
<h3>Item 39: Never Reuse Superclass Property Names</h3>
<p className="it">Imagine que deseamos agregar funcionalidad a la biblioteca de escenas gráficas del ítem 38 para recopilar información de diagnóstico, que puede ser útil para depurar o crear perfiles. Para hacer esto, nos gustaría dar a cada instancia de Actor un número de identificación único:</p>
<p className="p">Imagine that we wish to add functionality to the scene graph library of Item 38 for collecting diagnostic information, which can be useful for debugging or profiling. To do this, we’d like to give each Actor instance a unique identification number:</p>
<pre><code>		 function Actor(scene, x, y) &#123; this.scene = scene; this.x = x;<br></br>
this.y = y;<br></br>
this.id = ++Actor.nextID; scene.register(this);<br></br>
&#125;<br></br>
pipipi<br></br>
Actor.nextID = 0;</code></pre>
<p className="it">Ahora hagamos lo mismo para casos individuales de una subclase de Actor-say, una clase Alien que representa a los enemigos de nuestra nave espacial. Además de su número de identificación de actor, nos gustaría que cada extranjero tenga un número de identificación de extranjero separado.</p>
<p className="p">Now let’s do the same thing for individual instances of a subclass of Actor—say, an Alien class representing enemies of our spaceship. In addition to its actor identification number, we’d like each alien to have a separate alien identification number.</p>
<pre><code>		 function Alien(scene, x, y, direction, speed, strength) &#123; Actor.call(this, scene, x, y);<br></br>
this.direction = direction; this.speed = speed; this.strength = strength; this.damage = 0;<br></br>
this.id = ++Alien.nextID; // conflicts with actor id!<br></br>
&#125;<br></br>
pipipi<br></br>
Alien.nextID = 0;</code></pre>
<p className="it">Este código crea un conflicto entre la clase Alien y su superclase Actor: Ambas clases intentan escribir en una propiedad de instancia denominada id. Si bien cada clase puede considerar que la propiedad es "privada" (es decir, sólo relevante y accesible a los métodos definidos directamente en esa clase), el hecho es que la propiedad se almacena en objetos de instancia y se nombra con una cadena. Si dos clases en una jerarquía de herencia hacen referencia al mismo nombre de propiedad, se referirán a la misma propiedad.</p>
<p className="p">This code creates a conflict between the Alien class and its Actor superclass: Both classes attempt to write to an instance property called id. While each class may consider the property to be “private” (i.e., only relevant and accessible to methods defined directly on that class), the fact is that the property is stored on instance objects and named with a string. If two classes in an inheritance hierarchy refer to the same property name, they will refer to the same property.</p>
<p className="it">Como resultado, las subclases deben ser siempre conscientes de todas las propiedades utilizadas por sus superclases, incluso si esas propiedades son conceptualmente privadas. La resolución obvia en este caso es usar nombres de propiedad distintos para el número de identificación de Actor y el número de identificación de Extranjero:</p>
<p className="p">As a result, subclasses must always be aware of all properties used by their superclasses, even if those properties are conceptually private. The obvious resolution in this case is to use distinct property names for the Actor identification number and Alien identification number:</p>
<pre><code>		 function Actor(scene, x, y) &#123; this.scene = scene; this.x = x;<br></br>
this.y = y;<br></br>
this.actorID = ++Actor.nextID; // distinct from alienID<br></br>
scene.register(this);<br></br>
&#125;<br></br>
pipipi<br></br>
Actor.nextID = 0;<br></br>
pipipi<br></br>
function Alien(scene, x, y, direction, speed, strength) &#123; Actor.call(this, scene, x, y);<br></br>
this.direction = direction; this.speed = speed; this.strength = strength; this.damage = 0;<br></br>
this.alienID = ++Alien.nextID; // distinct from actorID<br></br>
&#125;<br></br>
pipipi<br></br>
Alien.nextID = 0;</code></pre>
<h3>Things to Remember</h3>
<p className="it">Tenga en cuenta todos los nombres de propiedad utilizados por sus superclases.</p>
<p className="p">Be aware of all property names used by your superclasses.</p>
<p className="it">Nunca reutilice un nombre de propiedad de superclase en una subclase.</p>
<p className="p">Never reuse a superclass property name in a subclass.</p>
<h3>Item 40: Avoid Inheriting from Standard Classes</h3>
<p className="it">La biblioteca estándar ECMAScript es pequeña, pero viene con un puñado de clases importantes como Array, Function y Date. Puede ser tentador extenderlas con subclases, pero desafortunadamente sus definiciones tienen un comportamiento especial suficiente que las subclases bien comportadas son imposibles de escribir.</p>
<p className="p">The ECMAScript standard library is small, but it comes with a handful of important classes such as Array, Function, and Date. It can be tempting to extend these with subclasses, but unfortunately their definitions have enough special behavior that well-behaved subclasses are impossible to write.</p>
<p className="it">Un buen ejemplo es la clase Array. Una biblioteca para operar en sistemas de archivos podría desear crear una abstracción de directorios que hereda todo el comportamiento de arrays:</p>
<p className="p">A good example is the <code>Array</code> class. A library for operating on file systems might wish to create an abstraction of directories that inherits all of the behavior of arrays:</p>
<pre><code>		 function Dir(path, entries) &#123;<br></br>
this.path = path;<br></br>
for (var i = 0, n = entries.length; i &#60; n; i++) &#123;<br></br>
this[i] = entries[i];<br></br>
&#125;<br></br>
&#125;<br></br>
pipipi<br></br>
Dir.prototype = Object.create(Array.prototype);<br></br>
// extends Array<br></br>
Unfortunately, this approach breaks the expected behavior of the<br></br>
length property of arrays:<br></br>
var dir = new Dir("/tmp/mysite",<br></br>
["index.html", "script.js", "style.css"]);<br></br>
dir.length; // 0</code></pre>
<p className="it">La razón de esto falla es que la propiedad de longitud opera especialmente en objetos que están marcados internamente como matrices "verdaderas". El estándar ECMA-Script especifica esto como una propiedad interna invisible llamada [[Class]]. No dejes que el nombre te engañe: JavaScript no tiene en secreto un sistema de clases interno. El valor de [[Clase]] es simplemente una etiqueta simple: Los objetos <code>Array</code> (creados por el constructor <code>Array</code> o la sintaxis [] están estampados con el valor [[Class]] "Array", las funciones se marcan con el [[Class ]] Valor "Función", y así sucesivamente. La Tabla 4.1 muestra el conjunto completo de valores [[Class]] definidos por ECMAScript.</p>

<p className="p">The reason this fails is that the length property operates specially  on objects that are marked internally as “true” arrays. The ECMA-Script standard specifies this as an invisible internal property called [[Class]]. Don’t let the name mislead you—JavaScript doesn’t secretly have an internal class system. The value of [[Class]] is just a simple tag: <code>Array</code> objects (created by the <code>Array</code> constructor or the [] syntax) are stamped with the [[Class]] value "Array", functions are stamped with the [[Class]] value "Function", and so on. Table 4.1 shows the complete set of [[Class]] values defined by ECMAScript.</p>
<p className="it">Entonces, ¿qué tiene que ver esta propiedad mágica [[Clase]] con la longitud? Como resulta, el comportamiento de longitud se define especialmente para objetos cuya propiedad [[Class]] tiene el valor "Array". Para estos objetos, la propiedad length se mantiene sincronizada con el número de propiedades indexadas del objeto. Si agrega más propiedades indexadas al objeto, la propiedad length se incrementa automáticamente; Si disminuye la longitud, elimina automáticamente las propiedades indexadas más allá de su nuevo valor.</p>
<p className="p">So what does this magic [[Class]] property have to do with length?   As it turns out, the behavior of length is defined specially for objects whose [[Class]] internal property has the value "Array". For these objects, the length property keeps itself in sync with the number of indexed properties of the object. If you add more indexed properties to the object, the length property increases itself automatically; if you decrease length, it automatically deletes any indexed properties beyond its new value.</p>
<p className="it">Pero cuando extendemos la clase Array, las instancias de la subclase no son creadas por new <code>Array</code> () o la sintaxis literal []. Así que los casos de Dir tienen el [[Clase]] "Objeto". Hay incluso una prueba para esto: El método predeterminado Object.prototype.toString consulta la propiedad interna [[Class]] de su receptor para crear una descripción genérica de un objeto, por lo que se puede llamar explícitamente a cualquier objeto dado y ver:</p>
<p className="p">But when we extend the <code>Array</code> class, instances of the subclass are not created by new Array() or the literal [] syntax. So instances of Dir have the [[Class]] "Object". There is even a test for this: The default Object.prototype.toString method queries the internal [[Class]] property of its receiver to create a generic description of an object, so you can call it explicitly on any given object and see:</p>
<pre><code>		 var dir = new Dir("/", []); Object.prototype.toString.call(dir); // "[object Object]" <br></br>
Object.prototype.toString.call([]);	// "[object Array]"</code></pre>
<p className="it">Como resultado, las instancias de Dir no heredan el comportamiento especial esperado de la propiedad length de matrices.</p>
<p className="p">As a result, instances of Dir do not inherit the expected special behavior of the length property of arrays.</p>
<p className="it">Tabla 4.1 Valores de la Propiedad Interna [[Clase]], según lo definido por ECMAScript</p>
<p className="p">Table 4.1 Values of the [[Class]] Internal Property, As Defined by ECMAScript</p>
<pre><code>		  [[Class]]	Construction	   <br></br>
"Array"	new	Array(...), [...]	   <br></br>
"Boolean"	new	Boolean(...)	   <br></br>
"Date"	new	Date(...)	   <br></br>
"Error"	new new new	Error(...), new EvalError(...), new RangeError(...), ReferenceError(...), new SyntaxError(...), TypeError(...), new URIError(...)	   <br></br>
"Function"	new	Function(...), function(...) &#123;...&#125;	   <br></br>
"JSON"	JSON	   <br></br>
"Math"	Math	   <br></br>
"Number"	new	Number(...)	   <br></br>
"Object"	new	Object(...), &#123;...&#125;, new MyClass(...)	   <br></br>
"RegExp"	new	RegExp(...), /.../	   <br></br>
"String"	new	String(...)	 </code></pre>
<p className="it">Una implementación mejor define una propiedad de instancia con la matriz de entradas:</p>
<p className="p">A better implementation defines an instance property with the array of entries:</p>
<pre><code>		 function Dir(path, entries) &#123;<br></br>
this.path = path;<br></br>
this.entries = entries; // array property<br></br>
&#125;</code></pre>
<p className="it">Los métodos de matriz se pueden redefinir en el prototipo delegando a los métodos correspondientes de la propiedad entradas:</p>
<p className="p">Array methods can be redefined on the prototype by delegating to the corresponding methods of the entries property:</p>
<pre><code>		 Dir.prototype.forEach = function(f, thisArg) &#123;<br></br>
if (typeof thisArg === "undefined") &#123; thisArg = this;<br></br>
&#125;<br></br>
this.entries.forEach(f, thisArg);<br></br>
&#125;;</code></pre>
<p className="it">La mayoría de los constructores de la biblioteca estándar de ECMAScript tienen problemas similares, donde ciertas propiedades o métodos esperan la [[Clase] derecha u otras propiedades internas especiales que las subclases no pueden proporcionar. Por esta razón es aconsejable evitar la herencia de cualquiera de las siguientes clases estándar: Array, Boolean, Date, Function, Number, RegExp o String.</p>
<p className="p">Most of the constructors of the ECMAScript standard library have similar problems, where certain properties or methods expect the right [[Class]] or other special internal properties that subclasses cannot provide. For this reason it’s advisable to avoid inheriting from any of the following standard classes: Array, Boolean, Date, Function, Number, RegExp, or String.</p>
<h3>Things to Remember</h3>
<p className="it">Heredar de clases estándar tiende a romperse debido a las propiedades internas especiales tales como [[Clase]].</p>
<p className="p">Inheriting from standard classes tends to break due to special internal properties such as [[Class]].</p>
<p className="it">Preferir delegar a propiedades en lugar de heredar de clases estándar.</p>
<p className="p">Prefer delegating to properties instead of inheriting from standard classes.</p>
<h3>Item 41: Treat Prototypes As an Implementation Detail</h3>
<p className="it">Un objeto proporciona un conjunto pequeño, simple y potente de operaciones a sus consumidores. Las interacciones más básicas que un consumidor tiene con un objeto están recibiendo sus valores de propiedad y llamando a sus métodos. Estas operaciones no cuidan particularmente donde en una jerarquía de prototipo se almacenan las propiedades. La implementación de un objeto puede evolucionar con el tiempo para implementar una propiedad en diferentes lugares en la cadena de prototipos del objeto, pero mientras su valor permanezca constante, estas operaciones básicas se comportan igual. En pocas palabras: Los prototipos son un detalle de implementación del comportamiento de un objeto.</p>
<p className="p">An object provides a small, simple, and powerful set of operations to its consumers. The most basic interactions a consumer has with an object are getting its property values and calling its methods. These operations do not particularly care where in a prototype hierarchy the properties are stored. The implementation of an object may evolve over time to implement a property in different places on the object’s prototype chain, but as long as its value remains consistent, these basic operations behave the same. Put simply: Prototypes are an implementation detail of an object’s behavior.</p>
<p className="it">Al mismo tiempo, JavaScript proporciona mecanismos de introspección para inspeccionar los detalles de un objeto. El Object.prototype</p>
<p className="p">At the same time, JavaScript provides convenient introspection mechanisms for inspecting the details of an object. The Object.prototype</p>
<p className="it">El método .hasOwnProperty determina si una propiedad se almacena directamente como una propiedad "propia" (es decir, una propiedad de instancia) de un objeto, ignorando completamente la jerarquía del prototipo. Las instalaciones Object.getPrototypeOf y __proto__ (consulte el ítem 30) permiten a los programas recorrer la cadena de prototipos de un objeto y mirar sus prototipos de objetos individualmente. Estas son características poderosas ya veces útiles.</p>
<p className="p">.hasOwnProperty method determines whether a property is stored directly as an “own” property (i.e., an instance property) of an object, ignoring the prototype hierarchy completely. The Object.getPrototypeOf and __proto__ facilities (see Item 30) allow programs to traverse the prototype chain of an object and look at its prototype objects individually. These are powerful and sometimes useful features.</p>
<p className="it">Pero un buen programador sabe cuándo respetar los límites de la abstracción. La inspección de los detalles de la implementación, incluso sin modificarlos, crea una dependencia entre los componentes de un programa. Si el productor de un objeto cambia sus detalles de implementación, el consumidor que depende de ellos se romperá. Estos tipos de errores pueden ser especialmente difíciles de diagnosticar porque constituyen acción a distancia: Un autor cambia la implementación de un componente y otro componente (a menudo escrito por un programador diferente) se rompe.</p>
<p className="p">But a good programmer knows when to respect abstraction boundaries. Inspecting implementation details—even without modifying them—creates a dependency between components of a program. If the producer of an object changes its implementation details, the consumer that depends on them will break. These kinds of bugs can be especially difficult to diagnose because they constitute action at a distance: One author changes the implementation of one component, and another component (often written by a different programmer) breaks.</p>
<p className="it">Del mismo modo, JavaScript no distingue entre las propiedades públicas y privadas de un objeto (véase el ítem 35). En su lugar, es su responsabilidad confiar en la documentación y la disciplina. Si una biblioteca proporciona un objeto con propiedades que son indocumentadas o documentadas específicamente como internas, lo más probable es que esas propiedades sean mejor dejadas a solas por los consumidores.</p>
<p className="p">Similarly, JavaScript does not distinguish between public and private properties of an object (see Item 35). Instead, it’s your responsibility to rely on documentation and discipline. If a library provides an object with properties that are undocumented or specifically documented as internal, chances are good that those properties are best left alone by consumers.</p>
<h3>Things to Remember</h3>
<p className="it">Los objetos son interfaces; Prototipos son implementaciones.</p>
<p className="p">Objects are interfaces; prototypes are implementations.</p>
<p className="it">Evite inspeccionar la estructura del prototipo de objetos que no controla.</p>
<p className="p">Avoid inspecting the prototype structure of objects you don’t control.</p>
<p className="it">Evite inspeccionar las propiedades que implementan los componentes internos de los objetos que no controla.</p>
<p className="p">Avoid inspecting properties that implement the internals of objects you don’t control.</p>
<h3>Item 42: Avoid Reckless Monkey-Patching</h3>
<p className="it">Habiendo luchado contra las abstracciones violatorias en el punto 41, consideremos ahora la infracción final. Dado que los prototipos se comparten como objetos, cualquiera puede agregar, eliminar o modificar sus propiedades. Esta práctica controvertida se conoce comúnmente como mono-remiendo.</p>
<p className="p">Having inveighed against violating abstractions in  Item  41,  let’s  now consider the ultimate violation. Since prototypes are shared as objects, anyone can add, remove, or modify their properties. This controversial practice is commonly known as monkey-patching.</p>
<p className="it">El atractivo de los remiendos de monos radica en su poder. ¿Faltan los arrays un método útil? Sólo tienes que añadirlo tú mismo:</p>
<p className="p">The appeal of monkey-patching lies in its power. Are arrays missing a useful method? Just add it yourself:</p>
<pre><code>		 Array.prototype.split = function(i) &#123; // alternative #1<br></br>
return [this.slice(0, i), this.slice(i)];<br></br>
&#125;;</code></pre>
<p className="it">Voilà: Cada instancia de matriz tiene un método de división.</p>
<p className="p">Voilà: Every array instance has a split method.</p>
<p className="it">Pero los problemas surgen cuando varias bibliotecas mono-patch los mismos prototipos de manera incompatible. Otra biblioteca podría monkey-patch <code>Array.prototype</code> con un método del mismo nombre:</p>
<p className="p">But problems arise when multiple libraries monkey-patch the same prototypes in incompatible ways. Another library might monkey-patch <code>Array.prototype</code> with a method of the same name:</p>
<pre><code> Array.prototype.split = function() &#123; // alternative #2<br></br>
var i = Math.floor(this.length / 2);<br></br>
return [this.slice(0, i), this.slice(i)];<br></br>
&#125;;</code></pre>
<p className="it">Cualquier uso de la división en una matriz ahora tiene aproximadamente una probabilidad del 50% de ser roto, dependiendo de cuál de los dos métodos ellos esperan.</p>
<p className="p">Any uses of split on an array now have roughly a 50% chance of being broken, depending on which of the two methods they expect.</p>
<p className="it">Como mínimo, cualquier biblioteca que modifique prototipos compartidos como <code>Array.prototype</code> debería documentar claramente que lo hace. Esto, por lo menos, da a los clientes una advertencia adecuada sobre posibles conflictos entre bibliotecas. Sin embargo, dos bibliotecas que mono-parche prototipos en forma conflictiva no se puede utilizar dentro del mismo programa. Una alternativa es que si una biblioteca sólo mono-patches prototipos como una conveniencia, puede proporcionar las modificaciones en una función que los usuarios pueden optar por llamar o ignorar:</p>
<p className="p">At the very least, any library that modifies shared prototypes such  as <code>Array.prototype</code> should clearly document that it does so. This at least gives clients adequate warning about potential conflicts between libraries. Nevertheless, two libraries that monkey-patch prototypes in conflicting ways cannot be used within the same program. One alternative is that if a library only monkey-patches prototypes as a convenience, it may provide the modifications in a function that users can choose to call or ignore:</p>
<pre><code>		 function addArrayMethods() &#123; Array.prototype.split = function(i) &#123;<br></br>
return [this.slice(0, i), this.slice(i)];<br></br>
&#125;;<br></br>
&#125;;</code></pre>
<p className="it">Por supuesto, este enfoque sólo funciona si la AddArrayMethods en realidad no depende de Array.prototype.split.</p>
<p className="p">Of course, this approach only works if the library providing addArrayMethods does not actually depend on Array.prototype.split.</p>
<p className="it">A pesar de los peligros, hay un uso particularmente confiable e invaluable del mono-remiendo: el polyfill. Los programas JavaScript y las bibliotecas se despliegan con frecuencia en múltiples plataformas, como las diferentes versiones de navegadores web hechas por diferentes proveedores. Estas plataformas pueden diferir en la cantidad de API estándar que implementan. Por ejemplo, ES5 define nuevos métodos <code>Array</code> tales como forEach, map y filter, y algunas versiones de los navegadores no pueden soportar estos métodos. El comportamiento de los métodos que faltan está definido por un estándar ampliamente aceptado, y muchos programas y bibliotecas pueden depender de estos métodos. Dado que su comportamiento es estandarizado, proporcionar implementaciones para estos métodos no plantea el mismo riesgo de incompatibilidad entre bibliotecas. De hecho,</p>
<p className="p">Despite the hazards, there is one particularly reliable and invaluable use of monkey-patching: the polyfill. JavaScript programs and libraries are frequently deployed on multiple platforms, such as the different versions of web browsers made by different vendors. These platforms can differ in how many standard APIs they implement. For example, ES5 defines new <code>Array</code> methods such as forEach, map, and filter, and some versions of browsers may not support these methods. The behavior of the missing methods is defined by a widely supported standard, and many programs and libraries may depend on these methods. Since their behavior is standardized, providing implementations for these methods does not pose the same risk of incompatibility between libraries. In fact, multiple libraries can provide implementations for the same standard methods (assuming they are all correctly implemented), since they all implement the same standard API.</p>
<p className="it">Puede llenar estas brechas de plataforma de forma segura protegiendo los parches de mono con una prueba:</p>
<p className="p">You can safely fill in these platform gaps by guarding monkey-patches with a test:</p>
<pre><code>
if (typeof Array.prototype.map !== "function") &#123; Array.prototype.map = function(f, thisArg) &#123;<br></br>
var result = [];<br></br>
for (var i = 0, n = this.length; i &#60; n; i++) &#123; result[i] = f.call(thisArg, this[i], i);<br></br>
&#125;<br></br>
return result;<br></br>
&#125;;<br></br>
&#125;</code></pre>
<p className="it">La comprobación de la presencia de Array.prototype.map asegura que una implementación integrada, que es probable que sea más eficiente y mejor probada, no se sobrescribirá.</p>
<p className="p">Testing for the presence of Array.prototype.map ensures that a built-in implementation, which is likely to be more efficient and better tested, won’t be overwritten.</p>
<h3>Things to Remember</h3>
<p className="it">Evite el reparo de monkey-patching.</p>
<p className="p">Avoid reckless monkey-patching.</p>
<p className="it">Documentar cualquier monkey-patching realizado por una biblioteca.</p>
<p className="p">Document any monkey-patching performed by a library.</p>
<p className="it">Considere la posibilidad de hacer monkey-patching opcional al realizar las modificaciones en una función exportada.</p>
<p className="p">Consider making monkey-patching optional by performing the modifications in an exported function.</p>
<p className="it">Utilice monkey-patching para proporcionar polyfills para falta de API estándar.</p>
<p className="p">Use monkey-patching to provide polyfills for missing standard APIs.</p>

</div>
</div>
  </Layout>
)
