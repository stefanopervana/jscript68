import Layout from '../components/layout'

export default () => (
  <Layout title='Chapter 6'>
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
<p className="chapter">6</p>
<h1>Library and API Design</h1>
<p className="it">Cada programador es un diseñador de API en un momento u otro. Tal vez usted no tiene planes inmediatos para escribir la siguiente biblioteca de JavaScript. Pero cuando se programa en una plataforma durante un período de tiempo suficientemente largo, se crea un repertorio de soluciones a problemas comunes y, tarde o temprano, se comienza a desarrollar utilidades y componentes reutilizables. Incluso si no las libera como bibliotecas independientes, desarrollar sus habilidades como escritor de bibliotecas puede ayudarle a escribir mejores componentes.</p><p className="p">Every programmer is an API designer at one time or another. Maybe you don’t have any immediate plans to write the next popular JavaScript library. But when you program in a platform for a long enough period of time, you build up a repertoire of solutions to common problems, and sooner or later you start to develop reusable utilities and components. Even if you don’t release these as independent libraries, developing your skills as a library writer can help you write better components.</p>
<p className="it">Diseñar bibliotecas es un negocio difícil y es tanto arte como ciencia. También es muy importante. Las API son el vocabulario básico de un programador. Una API bien diseñada permite a sus usuarios (que probablemente se incluyan!) Para expresar sus programas de forma clara, concisa y sin ambigüedad.</p><p className="p">Designing libraries is a tricky business and is as much art as science. It’s also incredibly important. APIs are a programmer’s basic vocabulary. A well-designed API enables your users (which probably includes yourself!) to express their programs clearly, concisely, and unambiguously.</p>
<h3>Item 53: Maintain Consistent Conventions</h3>
<p className="it">Hay pocas decisiones que afectan a los consumidores de la API de manera más generalizada que las convenciones que usan para nombres y firmas de funciones. Estas convenciones tienen una enorme influencia: establecen el vocabulario básico y los idiomas de las aplicaciones que los utilizan. Los usuarios de su biblioteca tienen que aprender a leer y escribir utilizando estos idiomas, y es su trabajo para hacer que el proceso de aprendizaje lo más fácil posible. La inconsistencia hace más difícil recordar qué convenciones se aplican en qué situaciones, lo que lleva a más tiempo dedicado a consultar la documentación de su biblioteca y menos tiempo dedicado a realizar un trabajo real.</p><p className="p">There are few decisions that affect API consumers more pervasively than the conventions you use for names and function signatures. These conventions have enormous influence: They establish the  basic vocabulary and idioms of the applications that use them. Users of your library have to learn to read and write using these idioms, and it’s your job to make that learning process as easy as possible. Inconsistency makes it harder to remember which conventions apply in which situations, which leads to more time spent consulting your library’s documentation and less time spent getting real work done.</p>
<p className="it">Una de las convenciones clave es el orden de los argumentos. Las bibliotecas de interfaz de usuario, por ejemplo, suelen tener funciones que aceptan múltiples mediciones como anchura y altura. Haga un favor a sus usuarios y asegúrese de que estos siempre vienen en el mismo orden. Y vale la pena elegir un pedido que coincida con otras bibliotecas-casi todas las bibliotecas aceptan el ancho primero, luego la altura:</p><p className="p">One of the key conventions is argument order. User interface libraries, for instance, usually have functions that accept multiple measurements such as width and height. Do your users a favor and make sure these always come in the same order. And it’s worth choosing an order that matches other libraries—nearly all libraries accept width first, then height:</p>
<pre><code>var widget = new Widget(320, 240); // width: 320, height: 240</code></pre>
<p className="it">A menos que tengas una razón realmente fuerte para necesitar variar de la práctica universal, mantente con lo que es familiar. Si su biblioteca es para la web, recuerde que los desarrolladores web rutinariamente tratan con múltiples idiomas (HTML, CSS y JavaScript ... como mínimo). No haga sus vidas aún más difícilmente variando innecesariamente de las convenciones que es probable que utilicen en su flujo de trabajo normal. Por ejemplo, cada vez que CSS acepta parámetros que describen los cuatro lados de un rectángulo, los requiere en sentido horario a partir de la parte superior (arriba, derecha, abajo, izquierda). Así que al escribir una biblioteca con una API análoga, se adhieren a este orden. Sus usuarios se lo agradecerán. O tal vez ni siquiera lo notarán, ¡tanto mejor! Pero puede estar seguro de que se dará cuenta si se desvían de la convención estándar.</p><p className="p">Unless you have a really strong reason for needing to vary from universal practice, stick with what’s  familiar. If your library is meant   for the web, remember that web developers routinely deal with multiple languages (HTML, CSS, and JavaScript... at a minimum). Don’t make their lives even harder by needlessly varying from conventions they are likely to use in their normal workflow. For example, whenever CSS accepts parameters describing the four sides of a rectangle, it requires them in clockwise order starting from the top (top, right, bottom, left). So when writing a library with an analogous API, stick to this order. Your users will thank you. Or maybe they won’t even notice—so much the better! But you can be sure they will notice if you deviate from standard convention.</p>
<p className="it">Si su API utiliza objetos de opciones (consulte el ítem 55), puede evitar la dependencia del orden de los argumentos. Para las opciones estándar, como las medidas de anchura / altura, debe elegir una convención de nomenclatura y adherirse a ella religiosamente. Si uno de sus firmas de función se buscan opciones de anchura y altura y otro analiza para w y h, sus usuarios están en toda una vida de comprobar constantemente la documentación que recordar que se utiliza cuando. Del mismo modo, si su clase Widget tiene métodos para el establecimiento de propiedades, asegúrese de usar la misma convención de nomenclatura para estos métodos de actualización. No hay una buena razón para una clase para tener un método setWidth y otra clase para hacer lo mismo con un método llamado anchura.</p><p className="p">If your API uses options objects (see Item 55), you can avoid the dependence on argument order. For standard options such as width/height measurements, you should pick a naming convention and adhere to it religiously. If one of your function signatures looks for width and height options and another looks for  w and h, your users are in for  a lifetime of constantly checking your documentation to remember which is used where. Similarly, if your Widget class has methods for setting properties, make sure you use the same naming convention for these update methods. There’s no good reason for one class to have a setWidth method and another class to do the same thing with a method called width.</p>
<p className="it">Cada buena biblioteca necesita documentación completa, pero una gran biblioteca trata su documentación como ruedas de entrenamiento. Una vez que los usuarios se acostumbren a las convenciones de su biblioteca, deben ser capaces de realizar tareas comunes sin revisar la documentación. Las convenciones consistentes pueden incluso ayudar a los usuarios a adivinar qué propiedades o métodos están disponibles sin buscarlos en absoluto, o descubrirlos en la consola y adivinar su comportamiento de los nombres.</p><p className="p">Every good library needs thorough documentation, but a great library treats its documentation as training wheels. Once your users get accustomed to your library’s conventions, they should be able to do common tasks without ever checking the documentation. Consistent conventions can even help users guess what properties or methods are available without looking them up at all, or discover them at the console and guess their behavior from the names.</p>
<h3>Things to Remember</h3>
<p className="it">Utilice convenciones consistentes para nombres de variables y firmas de funciones.</p><p className="p">Use consistent conventions for variable names and function signatures.</p>
<p className="it">No se desvíe de las convenciones que sus usuarios puedan encontrar en otras partes de su plataforma de desarrollo.</p><p className="p">Don’t deviate from conventions your users are likely to encounter in other parts of their development platform.</p>
<h3>Item 54: Treat undefined As “No Value”</h3>
<p className="it">El valor indefinido es especial: Siempre que JavaScript no tiene un valor específico para proporcionarlo sólo produce undefined. Las variables no asignadas comienzan con el valor undefined:</p><p className="p">The undefined value is special: Whenever JavaScript has no specific value to provide it just produces undefined. Unassigned variables start out with the value undefined:</p>
<pre><code>var x;<br></br>
x; // undefined</code></pre>
<p className="it">El acceso a propiedades inexistentes de los objetos produce undefined:</p><p className="p">Accessing nonexistent properties from objects produces undefined:</p>
<pre><code>var obj = &#123;&#125;; obj.x; // undefined</code></pre>
<p className="it">Devolver sin valor o caer al final de un cuerpo de función produce el valor de retorno undefined:</p><p className="p">Returning without a value or falling off the end of a function body produces the return value undefined:</p>
<pre><code>function f() &#123;<br></br>
return;<br></br>
&#125;<br></br>
function g() &#123; &#125; f(); // undefined<br></br>
g(); // undefined</code></pre>
<p className="it">Los parámetros de función que no se proporcionan con argumentos reales tienen el valor undefined:</p><p className="p">Function parameters that are not provided with actual arguments have the value undefined:</p>
<pre><code>function f(x) &#123;<br></br>
return x;<br></br>
&#125;<br></br>
<br></br>
f(); // undefined</code></pre>
<p className="it">En cada una de estas situaciones, el valor indefinido indica que la operación no resultó en un valor específico. Por supuesto, hay algo un poco paradójico sobre un valor que significa "sin valor". Pero cada operación tiene que producir algo, por lo que JavaScript utiliza undefined para llenar el vacío (por así decirlo).</p><p className="p">In each of these situations, the undefined value indicates that the operation did not result in a specific value. Of course, there’s something a little paradoxical about a  value  that  means  “no  value.”  But every operation has to produce something, so JavaScript uses undefined to fill the void (so to speak).</p>
<p className="it">Tratar indefinido como la ausencia de un valor específico es una convención establecida por el lenguaje. Usarlo para otros propósitos es una proposición arriesgada. Por ejemplo, una biblioteca de elementos de interfaz de usuario puede admitir un método de resaltado para cambiar el color de fondo de un elemento:</p><p className="p">Treating undefined as the absence of any specific value is a convention established by the language. Using it for other purposes is a risky proposition. For example, a library of user interface elements might support a highlight method for changing the background color of an element:</p>
<pre><code>element.highlight();	// use the default color<br></br>
element.highlight("yellow");	// use a custom color</code></pre>
<p className="it">¿Qué pasa si queremos proporcionar una forma de solicitar un color aleatorio? Podríamos usar undefined como un valor especial para ese propósito:</p><p className="p">What if we wanted to provide a way to request a random color? We could use undefined as a special value for that purpose:</p>
<pre><code>element.highlight(undefined); // use a random color</code></pre>
<p className="it">Pero esto estaría en desacuerdo con el significado habitual de indefinido. Esto hace que sea fácil de obtener el comportamiento incorrecto al obtener el valor de otra fuente, en particular uno que no puede tener un valor a proporcionar. Por ejemplo, un programa puede estar utilizando un objeto de configuración con una preferencia de color opcional:</p><p className="p">But this would be at odds with undefined’s usual meaning. This makes it easy to get the wrong behavior when getting the value from another source, particularly one that might not have a value to provide. For example, a program might be using a configuration object with an optional color preference:</p>
<pre><code>var config = JSON.parse(preferences);<br></br>
// ...<br></br>
element.highlight(config.highlightColor); // may be random</code></pre>
<p className="it">Si las preferencias no especifican un color, es muy probable que el programador obtenga el valor predeterminado, como si no se hubiera proporcionado ningún valor. Pero al reutilizar indefinido, realmente causamos que este código generara un color aleatorio. Un API mejor podría utilizar un nombre de color especial para el caso aleatorio:</p><p className="p">If the preferences do not specify a color, the programmer will most likely expect to get the default, just as if no value were provided. But by repurposing undefined, we actually caused this code to generate   a random color. A better API might use a special color name for the random case:</p>
<pre><code>element.highlight("random");</code></pre>
<p className="it">A veces no es posible que una API elija un valor de cadena especial que sea distinguible del conjunto normal de valores de cadena aceptados por la función. En estos casos, hay valores especiales distintos de undefined, como null o true. Pero estos tienden a no conducir a código muy legible:</p><p className="p">Sometimes it’s not possible for an API to choose a special string value that’s distinguishable from the normal set of string values accepted by the function. In these cases, there are special values other than undefined, such as null or true. But these tend not to lead to very readable code:</p>
<pre><code>element.highlight(null);</code></pre>
<p className="it">Para alguien que está leyendo el código y no puede tener su biblioteca comprometida con la memoria, este código es bastante opaco. De hecho, una primera suposición podría ser que elimina el resaltado. Una opción más explícita y descriptiva es representar el caso aleatorio como un objeto con una propiedad aleatoria (vea el ítem 55 para más información sobre objetos de opciones):</p><p className="p">For someone who is reading the code and may not have your library committed to memory, this code is rather opaque. In fact, a first guess might be that it removes highlighting. A more explicit and descriptive option is to represent the random case as an object with a random property (see Item 55 for more on options objects):</p>
<pre><code>element.highlight(&#123; random: true &#125;);</code></pre>
<p className="it">Otro lugar a tener en cuenta es indefinido en la implementación de argumentos opcionales. En teoría, el objeto argumentos (ver punto 51) hace posible detectar si un argumento se pasó, pero en la práctica, la prueba de undefined lleva a API más robustas. Por ejemplo, un servidor web puede tener un nombre de host opcional:</p><p className="p">Another place to watch out for  undefined is in the implementation  of optional arguments. In theory, the arguments object (see Item 51) makes it possible to detect whether an argument was passed, but in practice, testing for undefined leads to more robust APIs. For example, a web server might take an optional host name:</p>
<pre><code>var s1 = new Server(80, "example.com");<br></br>
var s2 = new Server(80); // defaults to "localhost"</code></pre>
<p className="it">El constructor del servidor podría implementarse mediante pruebas</p><p className="p">The Server constructor could be implemented by testing</p>
<pre><code>arguments.length:<br></br>
function Server(port, hostname) &#123;<br></br>
if (arguments.length &#60; 2) &#123; hostname = "localhost";<br></br>
&#125;<br></br>
<br></br>
<br></br>
hostname = String(hostname);<br></br>
// ...<br></br>
&#125;</code></pre>
<p className="it">Pero esto tiene un problema similar al método element.highlight anterior. Si un programa proporciona un argumento explícito solicitando un valor de otra fuente, como un objeto de configuración, puede producir undefined:</p><p className="p">But this has a similar problem to the element.highlight method above. If a program provides an explicit argument by requesting a value from another source such as a configuration object, it might produce undefined:</p>
<pre><code>var s3 = new Server(80, config.hostname);</code></pre>
<p className="it">Si no hay una preferencia de host especificada por config, el comportamiento natural es usar el "localhost" por defecto. Pero la implementación anterior termina con el nombre de host "undefined". Es mejor probar para undefined, que podría ser producido por dejar fuera el argumento o por proporcionar una expresión de argumento que resulta ser indefinido:</p><p className="p">If there’s no hostname preference specified by config, the natural behavior is to use the default "localhost". But the above implementation ends up with the host name "undefined". It’s better to test for undefined, which could be produced by leaving off the argument or by providing an argument expression that turns out to be undefined:</p>
<pre><code>function Server(port, hostname) &#123;<br></br>
if (hostname === undefined) &#123; hostname = "localhost";<br></br>
&#125;<br></br>
hostname = String(hostname);<br></br>
// ...<br></br>
&#125;</code></pre>
<p className="it">Una alternativa razonable es probar si el nombre de host es verídico (véase el punto 3). Los operadores lógicos lo hacen conveniente:</p><p className="p">A reasonable alternative is to test whether hostname is truthy (see Item 3). Logical operators make this convenient:</p>
<pre><code>function Server(port, hostname) &#123;<br></br>
hostname = String(hostname || "localhost");<br></br>
// ...<br></br>
&#125;</code></pre>
<p className="it">Esta versión utiliza el operador OR lógico (||), que devuelve el primer argumento si es un valor verídico y devuelve su segundo argumento. Por lo tanto, si hostname es indefinido o una cadena vacía, la expresión (hostname || "localhost") se evalúa como "localhost". Como tal, esto está probando técnicamente más que indefinido, tratará todos los valores falsos igual que indefinido. Esto es probablemente aceptable para el servidor ya que una cadena vacía no es un nombre de host válido. Por lo tanto, si está satisfecho con una API más flexible que coacciona todos los valores falsos a un valor predeterminado, la prueba de veracidad es una forma concisa de implementar valores predeterminados de parámetros.</p><p className="p">This version uses the logical OR operator (||), which returns the first argument if it is a truthy value and otherwise returns its second argument. So, if hostname is undefined or an empty string, the expression (hostname || "localhost") evaluates to "localhost". As such, this is technically testing for more than undefined—it will treat all falsy values the same as undefined. This is probably acceptable for Server since an empty string is not a valid host name. So, if you are happy with a looser API that coerces all falsy values to a default value, truthiness testing is a concise way to implement parameter default values.</p>
<p className="it">Pero ten cuidado: la veracidad no siempre es una prueba segura. Si una función debe aceptar la cadena vacía como valor legal, una prueba verídica anulará la cadena vacía y la reemplazará por el valor predeterminado. Del mismo modo, una función que acepta un número no debe utilizar una prueba de verdades si permite que 0 (o NaN, aunque es menos común) como un valor aceptable.</p><p className="p">But beware: Truthiness is not always a safe test. If a function should accept the empty string as a legal value, a truthy test will override the empty string and replace it with the default value. Similarly, a function that accepts a number should not use a truthy test if it allows 0 (or NaN, although it’s less common) as an acceptable value.</p>
<p className="it">Por ejemplo, una función para crear un elemento de interfaz de usuario puede permitir que un elemento tenga un ancho o una altura de 0, pero proporcione un valor predeterminado diferente:</p><p className="p">For example, a function for creating a user interface element might allow an element to have a width or height of 0, but provide a different default value:</p>
<pre><code>var c1 = new Element(0, 0); // width: 0, height: 0<br></br>
var c2 = new Element(); // width: 320, height: 240</code></pre>
<p className="it">Una implementación que usa veracidad sería buggy:</p><p className="p">An implementation that uses truthiness would be buggy:</p>
<pre><code>function Element(width, height) &#123;<br></br>
this.width = width || 320;	// wrong test<br></br>
this.height = height || 240; // wrong test<br></br>
// ...<br></br>
&#125;<br></br>
var c1 = new Element(0, 0); c1.width;	// 320<br></br>
c1.height; // 240</code></pre>
<p className="it">En cambio, tenemos que recurrir a la prueba más detallada para undefined:</p><p className="p">Instead, we have to resort to the more verbose test for undefined:</p>
<pre><code>function Element(width, height) &#123;<br></br>
this.width = width === undefined ? 320 : width;<br></br>
this.height = height === undefined ? 240 : height;<br></br>
// ...<br></br>
&#125;<br></br>
var c1 = new Element(0, 0); c1.width;	// 0<br></br>
c1.height; // 0<br></br>
var c2 = new Element(); c2.width;	// 320<br></br>
c2.height; // 240</code></pre>
<h3>Things to Remember</h3>
<p className="it">Evite usar undefined para representar algo que no sea la ausencia de un valor específico.</p><p className="p">Avoid using undefined to represent anything other than the absence of a specific value.</p>
<p className="it">Utilice valores de cadena descriptivos u objetos con propiedades booleanas con nombre, en lugar de undefined o null, para representar banderas específicas de la aplicación.</p><p className="p">Use descriptive string values or objects with named boolean properties, rather than undefined or null, to represent application-specific flags.</p>
<p className="it">Probar para undefined en lugar de comprobar arguments.length para proporcionar valores predeterminados de los parámetros.</p><p className="p">Test for undefined instead of checking arguments.length to provide parameter default values.</p>
<p className="it">Nunca utilice pruebas de veracidad para los valores por defecto de parámetros que deberían permitir que 0, NaN o la cadena vacía sean argumentos válidos.</p><p className="p">Never use truthiness tests for parameter default values that should allow 0, NaN, or the empty string as valid arguments.</p>
<h3>Item 55: Accept Options Objects for Keyword Arguments</h3>
<p className="it">Mantener convenciones consistentes para ordenar argumentos, como sugiere el ítem 53, es importante para ayudar a los programadores a recordar lo que significa cada argumento en una llamada de función. Esto funciona a un punto. Pero simplemente no escala más allá de algunos argumentos. Intente hacer sentido de una llamada de función como la siguiente:</p><p className="p">Keeping consistent conventions for argument order, as Item 53 suggests, is important for helping programmers remember what each argument in a function call means. This works to a point. But it simply doesn’t scale beyond a few arguments. Try making sense of a function call such as the following:</p>
<pre><code>var alert = new Alert(100, 75, 300, 200,<br></br>
"Error", message,<br></br>
"blue", "white", "black", "error", true);</code></pre>
<p className="it">Todos hemos visto APIs como esta. A menudo es el resultado del arrastre de argumentos, donde una función comienza simple, pero con el tiempo, a medida que la biblioteca se expande en funcionalidad, la firma adquiere cada vez más argumentos.</p><p className="p">We’ve all seen APIs like this. It’s often the result of argument creep, where a function starts out simple, but over time, as the library expands in functionality, the signature acquires more and more arguments.</p>
<p className="it">Afortunadamente, JavaScript proporciona un lenguaje sencillo y ligero que funciona bien para firmas de funciones más grandes: el objeto de opciones. Un objeto de opciones es un solo argumento que proporciona datos de argumento adicionales a través de sus propiedades con nombre. La forma literal del objeto lo hace especialmente agradable para leer y escribir:</p><p className="p">Fortunately, JavaScript provides a simple, lightweight idiom that works well for larger function signatures: the options object. An options object is a single argument that provides additional argument data through its named properties. The object literal form makes this especially pleasant to read and write:</p>
<pre><code>var alert = new Alert(&#123; x: 100, y: 75,<br></br>
width: 300, height: 200,<br></br>
title: "Error", message: message,<br></br>
titleColor: "blue", bgColor: "white", textColor: "black", icon: "error", modal: true<br></br>
&#125;);</code></pre>
<p className="it">Esta API es un poco más detallada, pero notablemente más fácil de leer. Cada argumento se auto-documenta: No hay necesidad de un comentario explicando su papel, ya que su nombre de propiedad lo explica perfectamente. Esto es especialmente útil para los parámetros booleanos como modal: Alguien que lee una llamada a una nueva alerta podría ser capaz de inferir el propósito de un argumento de cadena de su contenido, pero un verdadero o un falso desnudo no es particularmente informativo.</p><p className="p">This API is a little more verbose, but noticeably easier to read. Each argument becomes self-documenting: There’s no need for a comment explaining its role, since its property name explains it perfectly. This is especially helpful for boolean parameters such as modal: Someone reading a call to new Alert might be able to infer the purpose of a string argument from its contents, but a naked true or false is not particularly informative.</p>
<p className="it">Otra ventaja de los objetos de opciones es que cualquiera de los argumentos puede ser opcional, y un llamante puede proporcionar cualquier subconjunto de los argumentos opcionales. Con argumentos ordinarios (a veces llamados argumentos posicionales, ya que no se distinguen por su nombre sino por su posición en la lista de argumentos), los argumentos opcionales pueden a menudo introducir ambigüedades. Por ejemplo, si queremos que la posición y el tamaño de un objeto Alert sean opcionales, entonces no está claro cómo interpretar una llamada como esta:</p><p className="p">Another benefit of options objects is that any of the arguments can be optional, and a caller can provide any subset of the optional arguments. With ordinary arguments (sometimes called positional arguments, since they are distinguished not by name but by their position in the argument list), optional arguments can often introduce ambiguities. For example, if we want both the position and the size of an Alert object to be optional, then it’s not clear how to interpret a call such as this:</p>
<pre><code>var alert = new Alert(app,<br></br>
150, 150,<br></br>
"Error", message,<br></br>
"blue", "white", "black", "error", true);</code></pre>
<p className="it">¿Están los primeros dos números destinados a especificar los argumentos xey, anchura y altura? Con un objeto de opciones, no hay duda:</p><p className="p">Are the first two numbers meant to specify the x and y or width and height arguments? With an options object, there’s no question:</p>
<pre><code>var alert = new Alert(&#123; parent: app,<br></br>
width: 150, height: 100,<br></br>
title: "Error", message: message,<br></br>
titleColor: "blue", bgColor: "white", textColor: "black", icon: "error", modal: true<br></br>
&#125;);</code></pre>
<p className="it">Tradicionalmente, los objetos de opciones consisten exclusivamente en argumentos opcionales, por lo que incluso es posible omitir el objeto por completo:</p><p className="p">Traditionally, options objects consist exclusively of optional arguments, so it’s even possible to omit the object entirely:</p>
<pre><code>var alert = new Alert(); // use all default parameter values</code></pre>
<p className="it">Si hay uno o dos argumentos requeridos, es mejor mantenerlos separados del objeto de opciones:</p><p className="p">If there are one or two required arguments, it’s better to keep them separate from the options object:</p>
<pre><code>var alert = new Alert(app, message, &#123; width: 150, height: 100,<br></br>
title: "Error",<br></br>
titleColor: "blue", bgColor: "white", textColor: "black", icon: "error", modal: true<br></br>
&#125;);</code></pre>
<p className="it">La implementación de una función que acepta un objeto de opciones requiere un poco más de trabajo. Esta es una implementación completa:</p><p className="p">Implementing a function that accepts an options object takes a little more work. Here is a thorough implementation:</p>
<pre><code>function Alert(parent, message, opts) &#123;<br></br>
opts = opts || &#123;&#125;; // default to an empty options object&#92;<br></br> this.width = opts.width === undefined ? 320 : opts.width;&#92;<br></br> this.height = opts.height === undefined<br></br>
? 240<br></br>
: opts.height;<br></br>
this.x = opts.x === undefined<br></br>
? (parent.width / 2) (this.width / 2)<br></br>
: opts.x;<br></br>
<br></br>
<br></br>
this.y = opts.y === undefined<br></br>
? (parent.height / 2) (this.height / 2)<br></br>
: opts.y;<br></br>
this.title = opts.title || "Alert"; this.titleColor = opts.titleColor || "gray";&#92;<br></br> this.bgColor = opts.bgColor || "white"; this.textColor = opts.textColor || "black";&#92;<br></br> this.icon = opts.icon || "info";<br></br>
this.modal = !!opts.modal;<br></br>
this.message = message;<br></br>
&#125;</code></pre>
<p className="it">La implementación comienza proporcionando un objeto de opciones vacío predeterminado, usando el comando || (Véase el punto 54). La prueba de argumentos numéricos para undefined como Item 54 aconseja, ya que 0 es un valor válido pero no el valor predeterminado. Para los parámetros de cadena, usamos OR lógico bajo la suposición de que una cadena vacía no es un valor válido y debe ser reemplazada por un valor predeterminado. El parámetro modal coacciona su argumento a un booleano con un patrón de doble negación (!!).</p><p className="p">The implementation starts by providing a default empty options object, using the || operator (see Item 54). The numeric arguments test for undefined as Item 54 advises, since 0 is a valid value but not the default. For the string parameters, we use logical OR under the assumption that an empty string is not a valid value and should be replaced by a default value. The modal parameter coerces its argument to a boolean with a double negation pattern (!!).</p>
<p className="it">Este código es un poco más detallado de lo que sería con argumentos posicionales. Ahora, vale la pena pagar el precio dentro de la biblioteca si facilita la vida de los usuarios. Pero podemos hacer nuestra vida más fácil con una abstracción útil: una extensión de objeto o una función de fusión. Muchas bibliotecas y marcos de JavaScript vienen con una función de extensión, que toma un objeto de destino y un objeto de origen y copia las propiedades del último objeto en el primero. Una de las aplicaciones más útiles de esta utilidad es para abstraer la lógica de la fusión de valores por defecto y los valores proporcionados por el usuario para los objetos de opciones. Con la ayuda de extend, la función Alert se ve bastante más limpia:</p><p className="p">This code is a little more verbose than it would be with positional arguments. Now, it’s worth paying the price within the library if it makes users’ lives easier.  But we can make our own life easier with  a useful abstraction: an object extension or merging function. Many JavaScript libraries and frameworks come with an extend function, which takes a target object and a source object and copies the properties of the latter object into the former. One of the most useful applications of this utility is for abstracting out the logic of merging default values and user-provided values for options objects. With the help of extend, the Alert function looks quite a bit cleaner:</p>
<pre><code>function Alert(parent, message, opts) &#123; opts = extend(&#123;<br></br>
width: 320,<br></br>
height: 240<br></br>
&#125;);<br></br>
opts = extend(&#123;<br></br>
x: (parent.width / 2) (opts.width / 2), y: (parent.height / 2)&#92;<br></br> (opts.height / 2), title: "Alert",<br></br>
titleColor: "gray", bgColor: "white", textColor: "black", icon: "info", modal: false<br></br>
&#125;, opts);<br></br>
<br></br>
<br></br>
this.width = opts.width; this.height = opts.height; this.x = opts.x;<br></br>
this.y = opts.y;<br></br>
this.title = opts.title; this.titleColor = opts.titleColor;&#92;<br></br> this.bgColor = opts.bgColor; this.textColor = opts.textColor; this.icon = opts.icon;<br></br>
this.modal = opts.modal;<br></br>
&#125;</code></pre>
<p className="it">Esto evita reimplementar constantemente la lógica de comprobar la presencia de cada argumento. Observe cómo usamos dos llamadas para extender, ya que los valores por defecto para x e y dependen de calcular primero los valores de anchura y altura.</p><p className="p">This avoids constantly reimplementing the logic of checking for the presence of each argument. Notice how we use two calls to extend, since the default values for x and y depend on first computing the values of width and height.</p>
<p className="it">Podemos limpiar esto aún más si lo único que queremos hacer con las opciones es copiarlos en esto:</p><p className="p">We can clean this up even further if all we want to do with the options is copy them into this:</p>
<pre><code>function Alert(parent, message, opts) &#123; opts = extend(&#123;<br></br>
width: 320,<br></br>
height: 240<br></br>
&#125;);<br></br>
opts = extend(&#123;<br></br>
x: (parent.width / 2) (opts.width / 2), y: (parent.height / 2)&#92;<br></br> (opts.height / 2), title: "Alert",<br></br>
titleColor: "gray", bgColor: "white", textColor: "black", icon: "info", modal: false<br></br>
&#125;, opts); extend(this, opts);<br></br>
&#125;</code></pre>
<p className="it">Diferentes marcos proporcionan diferentes variaciones de la extensión, pero normalmente la implementación funciona enumerando las propiedades del objeto de origen y copiándolas en el destino siempre que no estén indefinidas:</p><p className="p">Different frameworks provide different variations of extend, but typically the implementation works by enumerating the properties of the source object and copying them into the target whenever they are not undefined:</p>
<pre><code>function extend(target, source) &#123;<br></br>
if (source) &#123;<br></br>
for (var key in source) &#123;<br></br>
var val = source[key];<br></br>
<br></br>
<br></br>
if (typeof val !== "undefined") &#123; target[key] = val;<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;<br></br>
return target;<br></br>
&#125;</code></pre>
<p className="it">Observe que existen pequeñas diferencias entre la versión original de Alert y la implementación mediante extend. Por un lado, nuestra lógica condicional en la primera versión evita incluso el cálculo de los valores por defecto si no son necesarios. Siempre y cuando el cálculo de los valores por defecto no tenga efectos secundarios, como modificar la interfaz de usuario o enviar una solicitud de red -lo que suele ser el caso- esto no es realmente un problema. Otra diferencia está en la lógica para determinar si se proporcionó un valor. En nuestra primera versión, tratamos una cadena vacía lo mismo que undefined para los distintos argumentos de cadena. Pero es más consistente tratar sólo indefinido como un argumento ausente; Utilizando el || Operador era más conveniente, pero una política menos uniforme para proporcionar valores de parámetros por defecto. La uniformidad es una buena meta en el diseño de la biblioteca,</p><p className="p">Notice that there are small differences between the original version  of Alert and the implementation using extend. For one, our conditional logic in the first version avoids even computing the default values if they aren’t needed. As long as computing the defaults has no side effects such as modifying the user interface or sending a network request—which is usually the case—this isn’t really a problem. Another difference is in the logic for determining whether a value was provided. In our first version, we treat an empty string the same as undefined for the various string arguments. But it’s more consistent to treat only undefined as a missing argument; using the || operator was more expedient but a less uniform policy for providing default parameter values. Uniformity is a good goal in library design, because it leads to better predictability for consumers of the API.</p>
<h3>Things to Remember</h3>
<p className="it">Utilice objetos de opciones para que las API sean más legibles y memorables.</p><p className="p">Use options objects to make APIs more readable and memorable.</p>
<p className="it">Los argumentos proporcionados por un objeto de opciones deben tratarse como opcionales.</p><p className="p">The arguments provided by an options object should all be treated as optional.</p>
<p className="it">Utilice una función de utilidad de ampliación para abstraer la lógica de extracción de valores de objetos de opciones.</p>
<p className="p">Use an extend utility function to abstract out the logic of extracting values from options objects.</p>
<h3>Item 56: Avoid Unnecessary State</h3>
<p className="it">APIs a veces se clasifican como stateful o apátridas. Una API sin estado proporciona funciones o métodos cuyo comportamiento depende únicamente de sus entradas, no del estado cambiante del programa. Los métodos de una cadena son apátridas: El contenido de la cadena no puede modificarse y los métodos dependen únicamente del contenido de la cadena y de los argumentos pasados ​​al método. No importa qué más está pasando en un programa, la expresión "foo" .toUpperCase () siempre producirá "FOO". Los métodos de un objeto Date, por el contrario, son stateful: Llamar toString en el mismo objeto Date puede producir resultados diferentes basados ​​en si las propiedades de la Fecha han sido modificadas por sus diversos métodos set.</p><p className="p">APIs are sometimes classified as either stateful or stateless. A stateless API provides functions or methods whose behavior depends only on their inputs, not on the changing state of the program. The methods of a string are stateless: The string’s contents cannot be modified, and the methods depend only on the contents of the string and the arguments passed to the method. No matter what else is going on in a program, the expression "foo".toUpperCase() will always produce "FOO". The methods of a Date object, by contrast, are stateful: Calling toString on the same Date object can produce different results based on whether the Date’s properties have been modified by its various set methods.</p>
<p className="it">Aunque el estado es a veces esencial, las API sin estado tienden a ser más fáciles de aprender y usar, más auto documentadas y menos propensas a errores. Un famoso API con estado es la biblioteca Canvas de la web, que proporciona elementos de interfaz de usuario con métodos para dibujar formas e imágenes en su superficie. Un programa puede dibujar texto en un lienzo utilizando el método fillText:</p><p className="p">While state is sometimes essential, stateless APIs tend to be easier to learn and use, more self-documenting, and less error-prone. A famous stateful API is the web’s Canvas library, which provides user interface elements with methods for drawing shapes and images onto their surface. A program can draw text onto a canvas using the fillText method:</p>
<pre><code>c.fillText("hello, world!", 75, 25);</code></pre>
<p className="it">Este método proporciona una cadena para dibujar y una posición en el lienzo. Pero no especifica otros atributos del texto dibujado como su color, transparencia o estilo de texto. Todos estos atributos se especifican por separado cambiando el estado interno del lienzo:</p><p className="p">This method provides a string to draw and a position in the canvas. But it doesn’t specify other attributes of the drawn text such as its color, transparency, or text style. All of these attributes are specified separately by changing the internal state of the canvas:</p>
<pre><code>c.fillStyle = "blue"; c.font = "24pt serif"; c.textAlign = "center";<br></br>
c.fillText("hello, world!", 75, 25);</code></pre>
<p className="it">Una versión con menos estado de la API podría tener el siguiente aspecto:</p><p className="p">A less stateful version of the API might instead look like this:</p>
<pre><code>c.fillText("hello, world!", 75, 25, &#123; fillStyle: "blue",<br></br>
font: "24pt serif", textAlign: "center"<br></br>
&#125;);</code></pre>
<p className="it">¿Por qué sería preferible este último? En primer lugar, es mucho menos frágil. La API con estado requiere modificar el estado interno de un lienzo para hacer cualquier cosa personalizada, y esto hace que una operación de dibujo afecte a otra, incluso si no tienen nada que ver entre sí. Por ejemplo, el estilo de relleno predeterminado es negro. Pero sólo puede contar con obtener el valor predeterminado si sabe que nadie ha cambiado los valores predeterminados. Si desea realizar una operación de dibujo que utilice el color predeterminado después de cambiarlo, deberá especificar explícitamente el valor predeterminado:</p><p className="p">Why might the latter be preferable? First of all, it’s much less fragile. The stateful API requires modifying the internal state of a canvas in order to do anything custom, and this causes one drawing operation to affect another one, even if they have nothing to do with each other. For example, the default fill style is black. But you can only count on getting the default value if you know that no one has changed the defaults already. If you want to do a drawing operation that uses the default color after changing it, you have to specify the default explicitly:</p>
<pre><code>c.fillText("text 1", 0, 0); // default color<br></br>
c.fillStyle = "blue"; c.fillText("text 2", 0, 30); // blue c.fillStyle = "black";<br></br>
c.fillText("text 3", 0, 60); // back in black</code></pre>
<p className="it">Compare esto con un API sin estado, que automáticamente habilitaría la reutilización de valores predeterminados:</p><p className="p">Compare this to a stateless API, which would automatically enable the reuse of default values:</p>
<pre><code>c.fillText("text 1", 0, 0); // default color c.fillText("text 2", 0, 30, &#123;&#92;<br></br> fillStyle: "blue" &#125;); // blue c.fillText("text 3", 0, 60); // default color</code></pre>
<p className="it">Observe también cómo cada sentencia se vuelve más legible: Para entender lo que cualquier llamada individual a fillText hace, no tiene que entender todas las modificaciones que la preceden. De hecho, el lienzo podría incluso ser modificado en alguna parte completamente separada del programa. Esto puede conducir fácilmente a errores, donde una pieza de código escrita en otro lugar cambia el estado del lienzo:</p><p className="p">Notice also how each statement becomes more readable: To understand what any individual call to fillText does, you don’t have to understand all the modifications that precede it. In fact, the canvas might even be modified in some completely separate part of the program. This can easily lead to bugs, where one piece of code written somewhere else changes the state of the canvas:</p>
<pre><code>c.fillStyle = "blue";<br></br>
drawMyImage(c); // did drawMyImage change c?<br></br>
c.fillText("hello, world!", 75, 25);</code></pre>
<p className="it">Para entender lo que sucede en la última línea, tenemos que saber qué modificaciones drawMyImage podría hacer en el lienzo. Un API apátrida conduce a un código más modular, que evita errores basados ​​en interacciones sorprendentes entre diferentes partes de su código, al tiempo que hace que el código sea más fácil de leer.</p><p className="p">To understand what happens in the last line, we have to know what modifications drawMyImage might make to the canvas. A stateless API leads to more modular code, which avoids bugs based on surprising interactions between different parts of your code, while simultaneously making the code easier to read.</p>
<p className="it">API de estado también son más difíciles de aprender. Al leer la documentación de fillText, no se puede saber qué aspectos del estado de un lienzo afectan al dibujo. Incluso si algunos de ellos son fáciles de adivinar, es difícil para un nonexpert saber si han inicializado correctamente todo el estado necesario. Por supuesto, es posible proporcionar una lista exhaustiva en la documentación de fillText. Y cuando usted necesita una API con estado, definitivamente debe documentar las dependencias de estado cuidadosamente. Pero una API sin estado elimina por completo estas dependencias implícitas, por lo que no necesitan la documentación adicional en primer lugar.</p><p className="p">Stateful APIs are also more difficult to learn. Reading the documentation for fillText, you can’t tell what aspects of the state of a canvas affect the drawing. Even if some of them are easy to guess, it’s hard for a nonexpert to know whether they’ve correctly initialized all of the necessary state. It’s of course possible to provide an exhaustive list in the documentation of fillText. And when you do need a stateful API, you should definitely document the state dependencies carefully. But a stateless API eliminates these implicit dependencies altogether, so they don’t need the extra documentation in the first place.</p>
<p className="it">Otro beneficio de las API sin estado es la concisión. Un API con estado tiende a conducir a una proliferación de instrucciones adicionales sólo para establecer el estado interno de un objeto antes de llamar a sus métodos. Considere un analizador para el formato de archivo de configuración "INI" popular. Por ejemplo, un archivo INI simple podría tener este aspecto:</p><p className="p">Another benefit of stateless APIs is conciseness. A stateful API tends to lead to a proliferation of additional statements just to set the internal state of an object before calling its methods. Consider a parser for the popular “INI” configuration file format. For example, a simple INI file might look like this:</p>
<pre><code>[Host] address=172.0.0.1 name=localhost [Connections] timeout=10000</code></pre>
<p className="it">Un acercamiento a una API para este tipo de datos sería proporcionar un método setSection para seleccionar una sección antes de buscar parámetros de configuración con un método get:</p><p className="p">One approach to an API for this kind of data would be to provide a setSection method for selecting a section before looking up configuration parameters with a get method:</p>
<pre><code>var ini = INI.parse(src);<br></br>
<br></br>
ini.setSection("Host");<br></br>
var addr = ini.get("address");<br></br>
var hostname = ini.get("name");<br></br>
<br></br>
<br></br>
ini.setSection("Connection");<br></br>
var timeout = ini.get("timeout");<br></br>
var server = new Server(addr, hostname, timeout);</code></pre>
<p className="it">Pero con una API sin estado, no es necesario crear variables adicionales como addr y hostname para guardar los datos extraídos antes de actualizar la sección:</p><p className="p">But with a stateless API, it’s not necessary to create extra variables like addr and hostname to save the extracted data before updating the section:</p>
<pre><code>var ini = INI.parse(src);<br></br>
var server = new Server(ini.Host.address,<br></br>
ini.Host.name, ini.Connection.timeout);</code></pre>
<p className="it">Observe cómo una vez que hacemos la sección explícita podemos simplemente representar el objeto ini como un diccionario, y cada sección como un diccionario, haciendo que la API sea aún más simple. (Consulte el Capítulo 5 para obtener más información sobre los objetos de diccionario).</p><p className="p">Notice how once we make the section explicit we can simply represent the ini object as a dictionary, and each section as a dictionary, making the API even simpler. (See Chapter 5 to learn more about dictionary objects.)</p>
<h3>Things to Remember</h3>
<p className="it">Prefiera las API sin estado siempre que sea posible.</p><p className="p">Prefer stateless APIs where possible.</p>
<p className="it">Al proporcionar API con estado, documente el estado relevante de que depende cada operación.</p><p className="p">When providing stateful APIs, document the relevant state that each operation depends on.</p>
<h3>Item 57: Use Structural Typing for Flexible Interfaces</h3>
<p className="it">Imagine una biblioteca para crear wikis: sitios web que contienen contenido que los usuarios pueden crear, eliminar y modificar interactivamente. Muchos wikis cuentan con lenguajes de marcado simples basados ​​en texto para crear contenido. Estos lenguajes de marcado suelen proporcionar un subconjunto de las funciones disponibles de HTML, pero con un formato de fuente más sencillo y legible. Por ejemplo, el texto puede formatearse rodeándolo con asteriscos para negrita, subrayados para subrayar y barras diagonales para cursivas. Los usuarios pueden introducir texto como este:</p><p className="p">Imagine a library for creating wikis: web sites containing content  that users can interactively create, delete, and modify. Many wikis feature simple, text-based markup languages for creating content. These markup languages typically provide a subset of the available features of HTML, but with a simpler and more legible source format. For example, text might be formatted by surrounding it with asterisks for bold, underscores for underlining, and forward slashes for italics. Users can enter text such as this:</p>
<pre><code>  This sentence contains a	bold phrase within it.</code></pre>
<p className="it">Esta oración contiene una frase subrayada dentro de ella. Esta oración contiene una / frase en cursiva / dentro de ella.</p><p className="p">This sentence contains an _underlined phrase_ within it. This sentence contains an /italicized phrase/ within it.</p>
<p className="it">El sitio mostraría el contenido a los lectores de wiki como: Esta frase contiene una frase en negrita dentro de ella.</p><p className="p">The site would then display the content to wiki readers as: This sentence contains a bold phrase within it.</p>
<p className="it">Esta frase contiene una frase subrayada dentro de ella. Esta frase contiene una frase en cursiva dentro de ella.</p><p className="p">This sentence contains an underlined phrase within it. This sentence contains an italicized phrase within it.</p>
<p className="it">Una biblioteca wiki flexible puede proporcionar a los escritores de aplicaciones una selección de lenguajes de marcado, ya que muchos formatos populares diferentes han surgido a lo largo de los años.</p><p className="p">A flexible wiki library might provide application writers with a choice of markup languages, since many different popular formats have emerged over the years.</p>
<p className="it">Para que esto funcione, necesitamos separar la funcionalidad de extraer el contenido del texto fuente de la marca de texto creada por el usuario del resto de la funcionalidad wiki, como la administración de cuentas, el historial de revisiones y el almacenamiento de contenido. El resto de la aplicación debe interactuar con la funcionalidad de extracción a través de una interfaz con un conjunto bien documentado de propiedades y métodos. Al programar estrictamente la API documentada de la interfaz e ignorar los detalles de implementación de esos métodos, el resto de la aplicación puede funcionar correctamente independientemente del formato de origen que elija una aplicación.</p><p className="p">To make this work, we need to separate the functionality of extracting the contents of user-created markup source text from the rest of the wiki functionality, such as account management, revision history, and content storage. The rest of the application should interact with the extraction functionality through an interface with a well-documented set of properties and methods. By programming strictly to the interface’s documented API  and  ignoring  the  implementation  details  of those methods, the rest of the application can function correctly regardless of which source format an application chooses to use.</p>
<p className="it">Veamos un poco más de cerca qué tipo de interfaz es necesaria para la extracción de contenido wiki. La biblioteca debe ser capaz de extraer metadatos como el título de la página y el autor y para dar formato al contenido de la página como HTML para mostrar a los lectores de wiki. Podemos representar cada página en el wiki como un objeto que proporciona acceso a estos datos a través de métodos de página como getTitle, getAuthor y toHTML.</p><p className="p">Let’s look a little more closely at what kind of interface is needed for wiki content extraction. The library must be able to extract metadata such as page title and author and to format page contents as HTML for displaying to wiki readers. We can represent each page in the wiki as an object that provides access to this data through page methods such as getTitle, getAuthor, and toHTML.</p>
<p className="it">A continuación, la biblioteca debe proporcionar una forma de crear una aplicación con un formateador de wiki personalizado, así como algunos formateadores incorporados para los formatos de marcado populares. Por ejemplo, un escritor de aplicaciones tal vez desee utilizar el formato MediaWiki (el formato utilizado por Wikipedia):</p><p className="p">Next, the library needs to provide a way to create an application with a custom wiki formatter, as well as some built-in formatters for popular markup formats. For example, an application writer might wish to use the MediaWiki format (the format used by Wikipedia):</p>
<pre><code>var app = new Wiki(Wiki.formats.MEDIAWIKI);</code></pre>
<p className="it">La biblioteca almacenaría esta función formateador internamente en el objeto de instancia Wiki:</p><p className="p">The library would store this formatter function internally in the Wiki instance object:</p>
<pre><code>function Wiki(format) &#123;<br></br>
this.format = format;<br></br>
&#125;</code></pre>
<p className="it">Cada vez que un lector quiere ver una página, la aplicación recupera su fuente y procesa una página HTML usando el formateador interno:</p><p className="p">Whenever a reader wants to view a page, the application retrieves its source and renders an HTML page using the internal formatter:</p>
<pre><code>Wiki.prototype.displayPage = function(source) &#123;<br></br>
var page = this.format(source); var title = page.getTitle(); var author =&#92;<br></br> page.getAuthor(); var output = page.toHTML();<br></br>
// ...<br></br>
&#125;;</code></pre>
<p className="it">¿Cómo se implementaría un formateador como Wiki.formats.MEDIAWIKI? Los programadores familiarizados con la programación basada en clases podrían estar inclinados a crear una clase de página base que represente el contenido usercreated e implementar cada formato diferente como una subclase de Page. El formato de MediaWiki se implementaría con una clase MWPage que extienda Page y MEDIAWIKI sería una "función de fábrica" ​​que devuelve una instancia de MWPage:</p><p className="p">How would a formatter such as Wiki.formats.MEDIAWIKI be implemented? Programmers familiar with class-based programming might be inclined to create a base Page class that represents the usercreated content and implement each different format as a subclass  of Page. The MediaWiki format would be implemented with a class MWPage that extends Page, and MEDIAWIKI would be a “factory function” that returns an instance of MWPage:</p>
<pre><code>function MWPage(source) &#123;<br></br>
Page.call(this, source); // call the super-constructor<br></br>
// ...<br></br>
&#125;<br></br>
<br></br>
// MWPage extends Page<br></br>
MWPage.prototype = Object.create(Page.prototype);<br></br>
<br></br>
      MWPage.prototype.getTitle = / ...	/; MWPage.prototype.getAuthor&#92;<br></br> = / ...		/; MWPage.prototype.toHTML = / ...	/;<br></br>
<br></br>
Wiki.formats.MEDIAWIKI = function(source) &#123;<br></br>
return new MWPage(source);<br></br>
&#125;;</code></pre>
<p className="it">(Consulte el Capítulo 4 para obtener más información sobre la implementación de jerarquías de clases con constructores y prototipos).</p>
<p className="p">(See Chapter 4 for more about implementing class hierarchies with constructors and prototypes.)</p>
<p className="it">Pero, ¿qué propósito práctico sirve la clase de la página de base? Dado que MWPage necesita su propia implementación de los métodos requeridos por la aplicación wiki-getTitle, getAuthor y toHTML- no hay necesariamente ningún código de implementación útil para heredar. Observe, también, que el método displayPage anterior no se preocupa por la jerarquía de herencia del objeto de página; Sólo requiere los métodos pertinentes para trabajar. Así que las implementaciones de los formatos wiki son libres de implementar esos métodos como quieran.</p>
<p className="p"> But what practical purpose does the base Page class serve? Since MWPage needs its own implementation  of the methods required by the wiki application—getTitle, getAuthor, and toHTML—there’s not necessarily any useful implementation code to inherit. Notice, too, that the displayPage method above does not care about the inheritance hierarchy of the page object; it only requires the relevant methods in order to work. So implementations of wiki formats are free to implement those methods however they like.</p>
<p className="it">Donde muchos lenguajes orientados a objetos fomentan la estructuración de sus programas alrededor de las clases y la herencia, JavaScript tiende a no permanecer en ceremonia. A menudo es perfectamente suficiente para proporcionar una implementación para una interfaz como el formato de página MediaWiki con un simple objeto literal:</p>
<p className="p">Where many object-oriented languages encourage structuring your programs around classes and inheritance, JavaScript tends not to stand on ceremony. It is often perfectly sufficient to provide an implementation for an interface like the MediaWiki page format with a simple object literal:</p>
<pre><code>Wiki.formats.MEDIAWIKI = function(source) &#123;<br></br>
// extract contents from source<br></br>
// ...<br></br>
return &#123;<br></br>
  getTitle: function() &#123; / ...	/ &#125;,<br></br>
  getAuthor: function() &#123; / ...	/ &#125;,<br></br>
  toHTML: function() &#123; / ...	/ &#125;<br></br>
&#125;;<br></br>
&#125;;</code></pre>
<p className="it">Es más, la herencia a veces causa más problemas de los que resuelve. Esto se hace evidente cuando varios formatos wiki diferentes comparten conjuntos de funciones no superpuestos: Puede que no haya ninguna jerarquía de herencia que tenga sentido. Por ejemplo, imagine tres formatos:</p><p className="p">What’s more, inheritance  sometimes  causes  more  problems  than it solves. This becomes evident when several different wiki formats share nonoverlapping sets of functionality: There may not be any inheritance hierarchy that makes sense. For example, imagine three formats:</p>
<pre><code>      Format A: bold, [Link], /italics/ Format B:	bold , [[Link]], italics Format C:	bold , [Link], italics</code></pre>
<p className="it">Nos gustaría implementar piezas individuales de funcionalidad para reconocer cada tipo diferente de entrada, pero la mezcla y coincidencia de la funcionalidad simplemente no se correlaciona con ninguna clara relación jerárquica entre A, B y C (¡Les doy la bienvenida a probarlo!) . Lo correcto es implementar funciones independientes para cada tipo de concordancia de entrada: asteriscos simples, asteriscos dobles, barras diagonales, corchetes, etc., y combinar y combinar la funcionalidad según sea necesario para cada formato.</p><p className="p">We would like to implement individual pieces of functionality for recognizing each different kind of input, but the mixing and matching of functionality just doesn’t map to any clear hierarchical relationship between A, B, and C (I welcome you to try it!). The right thing to do  is to implement separate functions for each kind of input matching— single asterisks, double asterisks, slashes, brackets, and so on—and mix and match functionality as needed for each format.</p>
<p className="it">Observe que al eliminar la superclase Page, no tenemos que reemplazarla por nada. Aquí es donde la escritura dinámica de JavaScript realmente brilla. Cualquiera que desee implementar un nuevo formato personalizado puede hacerlo sin necesidad de "registrarlo" en algún lugar. El método displayPage funciona con cualquier objeto JavaScript, siempre y cuando tenga la estructura adecuada: los métodos getTitle, getAuthor y getHTML esperados, cada uno con el comportamiento esperado.</p><p className="p">Notice that by eliminating the Page superclass, we don’t have to replace it with anything. This is where JavaScript’s dynamic typing really shines. Anyone who wishes to implement a new custom format can do so without needing to “register” it somewhere. The displayPage method works with any JavaScript object whatsoever, so long as it has the proper structure: the expected getTitle, getAuthor, and getHTML methods, each with the expected behavior.</p>
<p className="it">Este tipo de interfaz se conoce a veces como el mecanografiar estructural o el mecanografiar del pato: Cualquier objeto hará tan largo como tiene la estructura prevista (si parece un pato, nada como un pato, y cuacates como un pato ...). Es un elegante patrón de programación y especialmente ligero en lenguajes dinámicos como JavaScript, ya que no requiere que escriba nada explícito. Una función que llama métodos a un objeto funcionará en cualquier objeto que implemente la misma interfaz. Por supuesto, debe enumerar las expectativas de una interfaz de objeto en la documentación de su API. De esta manera, los implementadores saben qué propiedades y métodos son necesarios, y lo que sus bibliotecas o aplicaciones esperan de su comportamiento.</p><p className="p">This kind of interface is sometimes known as structural typing or duck typing: Any object will do so long as it has the expected structure (if it looks like a duck, swims like a duck, and quacks like a duck...). It’s an elegant programming pattern and especially lightweight in dynamic languages such as JavaScript, since it doesn’t require you to write anything explicit. A function that calls methods on an object will work on any object that implements the same interface. Of course, you should list out the expectations of an object interface in your API documentation. This way, implementers know what properties and methods are required, and what your libraries or applications expect of their behavior.</p>
<p className="it">Otro beneficio de la flexibilidad de la tipificación estructural es la prueba unitaria. Nuestra biblioteca wiki probablemente espera ser conectada a un objeto de servidor HTTP que implementa la funcionalidad de red del wiki. Si queremos probar las secuencias de interacción del wiki sin realmente conectarnos a la red, podemos implementar un objeto simulador que pretende comportarse como un servidor HTTP activo pero sigue un script prescrito en lugar de tocar la red. Esto proporciona una interacción repetible con un servidor falso, en lugar de confiar en el comportamiento impredecible de la red, haciendo posible probar el comportamiento de los componentes que interactúan con el servidor.</p><p className="p">Another benefit of the flexibility of structural typing is for unit testing. Our wiki library probably expects to be plugged into an HTTP server object that implements the networking functionality of the wiki. If   we want to test the interaction sequences of the wiki without actually connecting to the network, we can implement a mock object that pretends to behave like a live HTTP server but follows a prescribed script instead of touching the network. This provides a repeatable interaction with a fake server, instead of relying on the unpredictable behavior of the network, making it possible to test the behavior of components that interact with the server.</p>
<h3>Things to Remember</h3>
<p className="it">Utilice el mecanografiado estructural (también conocido como mecanografía del pato) para las interfaces flexibles del objeto.</p><p className="p">Use structural typing (also known as duck typing) for flexible object interfaces.</p>
<p className="it">Evite la herencia cuando las interfaces estructurales son más flexibles y ligeras.</p><p className="p">Avoid inheritance when structural interfaces are more flexible and lightweight.</p>
<p className="it">Utilice objetos simulados, es decir, implementaciones alternativas de interfaces que proporcionen un comportamiento repetible para las pruebas de unidad.</p><p className="p">Use mock objects, that is, alternative implementations of interfaces that provide repeatable behavior, for unit testing.</p>
<h3>Item 58: Distinguish between <code>Array</code> and Array-Like</h3>
<p className="it">Considere dos APIs de clase diferentes. La primera es para vectores de bits: colecciones ordenadas de bits.</p><p className="p">Consider two different class APIs. The first is for bit vectors: ordered collections of bits.</p>
<pre><code>var bits = new BitVector();<br></br>
<br></br>
bits.enable(4); bits.enable([1, 3, 8, 17]);<br></br>
<br></br>
bits.bitAt(4); // 1<br></br>
bits.bitAt(8); // 1<br></br>
bits.bitAt(9); // 0</code></pre>
<p className="it">Observe que el método enable está sobrecargado: Puede pasarlo ya sea un índice o una matriz de índices.</p><p className="p">Notice that the enable method is overloaded: You can pass it either an index or an array of indices.</p>
<p className="it">La API de segunda clase es para conjuntos de cadenas: colecciones no ordenadas de cadenas.</p><p className="p">The second class API is for string sets: unordered collections of strings.</p>
<pre><code>var set = new StringSet();<br></br>
<br></br>
set.add("Hamlet"); set.add(["Rosencrantz", "Guildenstern"]);<br></br>
set.add(&#123; "Ophelia": 1, "Polonius": 1, "Horatio": 1 &#125;);<br></br>
<br></br>
set.contains("Polonius");	// true set.contains("Guildenstern"); // true set.contains("Falstaff");	// false</code></pre>
<p className="it">Similar al método enable de vectores de bits, el método add también está sobrecargado, pero además de cadenas y arreglos de cadenas, también acepta un objeto de diccionario.</p><p className="p">Similar to the enable method of bit vectors, the add method is also overloaded, but in addition to strings and arrays of strings, it also accepts a dictionary object.</p>
<p className="it">Para implementar BitVector.prototype.enable, podemos evitar la pregunta de cómo determinar si un objeto es una matriz probando primero el otro caso:</p><p className="p">To implement BitVector.prototype.enable, we can avoid the question of how to determine whether an object is an array by testing the other case first:</p>
<pre><code>BitVector.prototype.enable = function(x) &#123;<br></br>
if (typeof x === "number") &#123;<br></br>
this.enableBit(x);<br></br>
&#125; else &#123; // assume x is array-like<br></br>
for (var i = 0, n = x.length; i &#60; n; i++) &#123;<br></br>
this.enableBit(x[i]);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">No hay problema. ¿Qué pasa con StringSet.prototype.add? Ahora parece que necesitamos distinguir entre arrays y objetos. Pero esa pregunta ni siquiera tiene sentido-arrays de JavaScript son objetos! Lo que realmente queremos hacer es separar los objetos de matriz de los objetos nonarray.</p><p className="p">No problem. What about StringSet.prototype.add? Now we seem to need to distinguish between arrays and objects. But that question doesn’t even make sense—JavaScript arrays are objects! What we really want to do is separate out array objects from nonarray objects.</p>
<p className="it">Hacer esta distinción está en desacuerdo con la noción flexible de JavaScript de objetos "tipo array" (véase el ítem 51). Cualquier objeto puede ser tratado como una matriz siempre y cuando obedezca la interfaz correcta. Y no hay una manera clara de probar un objeto para ver si está destinado a satisfacer una interfaz. Podemos tratar de adivinar que un objeto que tiene una propiedad length está destinado a ser una matriz, pero esto no es garantía; ¿Qué sucede si usamos un objeto de diccionario que tiene la clave "longitud" en él?</p><p className="p">Making this distinction is at odds with JavaScript’s flexible notion   of “array-like” objects (see Item 51). Any object can be treated as an array as long as it obeys the right interface. And there’s no clear way to test an object to see whether it’s intended to satisfy an interface. We might try to guess that an object that has a length property is intended to be an array, but this is no guarantee; what if we happen to use a dictionary object that has the key "length" in it?</p>
<pre><code>dimensions.add(&#123;<br></br>
"length": 1, // implies array-like?<br></br>
"height": 1,<br></br>
"width":	1<br></br>
&#125;);</code></pre>
<p className="it">El uso de heurísticas imprecisas para determinar su interfaz es una receta para el malentendido y el mal uso. Adivinar si un objeto implementa un tipo estructural a veces se conoce como prueba de pato (después de los "tipos de pato" descritos en el ítem 57), y es mala práctica. Dado que los objetos no están etiquetados con información explícita para indicar los tipos estructurales que implementan, no hay una forma confiable y programática para detectar esta información.</p><p className="p">Using imprecise heuristics to determine their interface is a recipe for misunderstanding and misuse. Guessing whether an object implements a structural type is sometimes known as duck testing (after  the “duck types” described in Item 57), and it’s bad practice. Since objects are not tagged with explicit information to indicate the structural types they implement, there’s no reliable, programmatic way to detect this information.</p>
<p className="it">La sobrecarga de dos tipos significa que debe haber una manera de distinguir los casos. Y no es posible detectar que un valor implemente una interfaz estructural. Esto conduce a la siguiente regla:</p><p className="p">Overloading two types means there must be a way to distinguish the cases. And it’s not possible to detect that a value implements a structural interface. This leads to the following rule:</p>
<p className="it">Las API nunca deben sobrecargar tipos estructurales con otros tipos de superposición.</p><p className="p">APIs should never overload structural types with other overlapping types.</p>
<p className="it">Para StringSet, la respuesta es no utilizar la interfaz estructural "array-like" en primer lugar. Deberíamos elegir un tipo que contenga una "etiqueta" bien definida que indique que el usuario realmente quiere que sea un array. Una opción obvia pero imperfecta es usar el operador instanceof para probar si un objeto hereda de <code>Array.prototype</code>:</p><p className="p">For StringSet, the answer is not to use the structural “array-like” interface in the first place. We should instead choose a type that carries a well-defined “tag” indicating that the user truly intends it to   be an array. An obvious but imperfect choice is to use the instanceof operator to test whether an object inherits from <code>Array.prototype</code>:</p>
<pre><code>StringSet.prototype.add = function(x) &#123;<br></br>
if (typeof x === "string") &#123;<br></br>
this.addString(x);<br></br>
&#125; else if (x instanceof Array) &#123; // too restrictive<br></br>
x.forEach(function(s) &#123;<br></br>
this.addString(s);<br></br>
&#125;, this);<br></br>
&#125; else &#123;<br></br>
for (var key in x) &#123;<br></br>
this.addString(key);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">Después de todo, sabemos con seguridad que cada vez que un objeto es una instancia de Array, se comporta como una matriz. Pero esta vez resulta que es una distinción demasiado fina. En entornos donde puede haber varios objetos globales, puede haber varias copias del constructor <code>Array</code> estándar y del objeto prototipo. Esto ocurre en el navegador, donde cada fotograma recibe una copia separada de la biblioteca estándar. Al comunicar valores entre cuadros, una matriz de una trama no heredará del array.prototype de otra trama.</p><p className="p">After all, we know for sure that anytime an object is an instance of Array,  it behaves like an array. But this time it turns out  that this   is too fine a distinction. In environments where there can be multiple global objects, there may be multiple copies of the standard <code>Array</code> constructor and prototype object. This happens in the browser, where each frame gets a separate copy of the standard library. When communicating values between frames, an array from one frame will not inherit from the <code>Array.prototype</code> of another frame.</p>
<p className="it">Por esta razón, ES5 introdujo la función Array.isArray, que comprueba si un valor es una matriz, independientemente de la herencia de prototipo. En los estándares ECMAScript-ese, esta función comprueba si el valor de la propiedad interna [[Class]] del objeto es "Array". Cuando necesita probar si un objeto es una matriz verdadera, no sólo un objeto similar a una matriz, Array.isArray es más fiable que instanceof.</p><p className="p">For this reason, ES5 introduced the Array.isArray function, which tests whether a value is an array, regardless of prototype inheritance. In ECMAScript standards-ese, this function tests whether the value of the internal [[Class]] property of the object is "Array". When you need to test whether an object is a true array, not just an array-like object, Array.isArray is more reliable than instanceof.</p>
<p className="it">Esto conduce a una implementación más robusta del método add:</p><p className="p">This leads to a more robust implementation of the add method:</p>
<pre><code>StringSet.prototype.add = function(x) &#123;<br></br>
if (typeof x === "string") &#123;<br></br>
this.addString(x);<br></br>
&#125; else if (Array.isArray(x)) &#123; // tests for true arrays<br></br>
x.forEach(function(s) &#123;<br></br>
this.addString(s);<br></br>
&#125;, this);<br></br>
&#125; else &#123;<br></br>
<br></br>
<br></br>
for (var key in x) &#123;<br></br>
this.addString(key);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">En entornos que no soportan ES5, puede utilizar el método Object.prototype.toString para probar si un objeto es una matriz:</p><p className="p">In environments that don’t support ES5, you can use the standard Object.prototype.toString method to test whether an object is an array:</p>
<pre><code>var toString = Object.prototype.toString;<br></br>
<br></br>
function isArray(x) &#123;<br></br>
return toString.call(x) === "[object Array]";<br></br>
&#125;</code></pre>
<p className="it">La función Object.prototype.toString utiliza la propiedad [[Class]] interna de un objeto para crear su cadena de resultados, por lo que también es un método más fiable que instanceof para probar si un objeto es una matriz.</p><p className="p">The Object.prototype.toString function uses the internal [[Class]] property of an object to create its result string, so it too is a more reliable method than instanceof for testing whether an object is an array.</p>
<p className="it">Tenga en cuenta que esta versión de agregar tiene un comportamiento diferente que afecta a los consumidores de la API. La versión de matriz de la API sobrecargada no acepta objetos similares a una matriz arbitraria. Por ejemplo, no puede pasar un objeto argumentos y esperar que se trate como una matriz:</p><p className="p">Notice that this version of add has different behavior that affects consumers of the API. The array version of the overloaded API does not accept arbitrary array-like objects. You can’t, for example, pass an arguments object and expect it to be treated as an array:</p>
<pre><code>function MyClass() &#123;<br></br>
this.keys = new StringSet();<br></br>
// ...<br></br>
&#125;<br></br>
<br></br>
MyClass.prototype.update = function() &#123;<br></br>
this.keys.add(arguments); // treated as a dictionary<br></br>
&#125;;</code></pre>
<p className="it">En su lugar, la forma correcta de utilizar add es convertir el objeto en una matriz verdadera, utilizando el idioma descrito en el ítem 51:</p><p className="p">Instead, the correct way to use add is to convert the object to a true array, using the idiom described in Item 51:</p>
<pre><code>MyClass.prototype.update = function() &#123;<br></br>
this.keys.add([].slice.call(arguments));<br></br>
&#125;;</code></pre>
<p className="it">Los llamantes necesitan hacer esta conversión siempre que quieran pasar un objeto de tipo array a una API que espera una matriz verdadera. Por esta razón, es necesario documentar cuál de los dos tipos acepta su API. En los ejemplos anteriores, el método enable acepta números y objetos parecidos a arrays, mientras que el método add acepta cadenas, matrices verdaderas y objetos (nonarray).</p><p className="p">Callers need to do this conversion whenever they want to pass an array-like object to an API that expects a true array. For this reason, it’s necessary to document which of the two types your API accepts. In the examples above, the enable method accepts numbers and arraylike objects, whereas the add method accepts strings, true arrays, and (nonarray) objects.</p>
<h3>Things to Remember</h3>
<p className="it">Nunca sobrecargue tipos estructurales con otros tipos de superposición.</p><p className="p">Never overload structural types with other overlapping types.</p>
<p className="it">Al sobrecargar un tipo estructural con otros tipos, primero pruebe los otros tipos.</p><p className="p">When overloading a structural type with other types, test for the other types first.</p>
<p className="it">Acepte matrices verdaderas en lugar de objetos tipo array al sobrecargar con otros tipos de objeto.</p><p className="p">Accept true arrays instead of array-like objects when overloading with other object types.</p>
<p className="it">Documente si su API acepta matrices verdaderas o valores tipo array.</p><p className="p">Document whether your API accepts true arrays or array-like values.</p>
<p className="it">Utilice Array.isArray de ES5 para probar matrices verdaderas.</p><p className="p">Use ES5’s Array.isArray to test for true arrays.</p>
<h3>Item 59: Avoid Excessive Coercion</h3>
<p className="it">JavaScript es notoriamente laxa acerca de los tipos (véase el punto 3). Muchos de los operadores y bibliotecas estándar obligan automáticamente sus argumentos al tipo esperado en lugar de lanzar excepciones para entradas inesperadas. Sin lógica adicional, la construcción de estas operaciones incorporadas hereda su comportamiento coactivo:</p><p className="p">JavaScript is notoriously lax about types (see Item 3). Many of the standard operators and libraries automatically coerce their arguments to the expected type rather than throwing exceptions for unexpected inputs. Without additional logic, building off of these built-in operations inherits their coercing behavior:</p>
<pre><code>function square(x) &#123;<br></br>
 return x	x;<br></br>
&#125;<br></br>
<br></br>
square("3"); // 9</code></pre>
<p className="it">Coercions ciertamente puede ser conveniente. Pero como el punto 3 señala, también pueden causar problemas, ocultar errores y conducir a un comportamiento errático y difícil de diagnosticar.</p><p className="p">Coercions can certainly be convenient. But as Item 3 points  out, they can also cause trouble, hiding errors and leading to erratic and hard-to-diagnose behavior.</p>
<p className="it">Los coercions son especialmente confusos cuando se trabaja con firmas de funciones sobrecargadas, como el método enable de la clase de vector de bits de Item</p><p className="p">Coercions are especially confusing when working with overloaded function signatures, like the enable method of the bit vector class of Item</p>
<p className="it">El método utiliza el tipo de argumento para determinar su comportamiento. La firma se volvería más difícil de entender si habilitar intentara coaccionar su argumento a un tipo esperado. ¿Qué tipo debe elegir? Coaccionar a un número rompe completamente la sobrecarga:</p><p className="p">The method uses its argument’s type to determine its behavior. The signature would become harder to understand if enable attempted to coerce its argument to an expected type. Which type should it choose? Coercing to a number completely breaks the overloading:</p>
<pre><code>BitVector.prototype.enable = function(x) &#123; x = Number(x);<br></br>
if (typeof x === "number") &#123; // always true<br></br>
this.enableBit(x);<br></br>
&#125; else &#123;	// never executed<br></br>
for (var i = 0, n = x.length; i &#60; n; i++) &#123;<br></br>
this.enableBit(x[i]);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;;</code></pre>

<p className="it">Como regla general, es prudente evitar coaccionar los argumentos cuyo tipo se utiliza para determinar el comportamiento de una función sobrecargada. Coercions hacen que sea más difícil decir con qué variante terminará. Imagínese tratando de darle sentido a este uso:</p><p className="p">As a general rule, it’s wise to avoid coercing arguments whose type is used to determine an overloaded function’s behavior. Coercions make it harder to tell which variant you will end up with. Imagine trying to make sense of this use:</p>
<pre><code>bits.enable("100"); // number or array-like?</code></pre>
<p className="it">Este uso de habilitar es ambiguo: El llamador podría plausiblemente haber pretendido que el argumento sea tratado como un número o como una matriz de valores de bit. Pero nuestro constructor no fue diseñado para cadenas, así que no hay forma de saberlo. Es probable que una indicación de que la persona que llama no entiende la API. De hecho, si quisiéramos ser un poco más cuidadosos en nuestra API, podríamos hacer cumplir que sólo se acepten números y objetos:</p><p className="p">This use of enable is ambiguous: The caller could plausibly have intended the argument to be treated as a number or as an array of bit values. But our constructor was not designed for strings, so there’s no way to know. It’s likely an indication that the caller didn’t understand the API. In fact, if we wanted to be a little more careful in our API, we could enforce that only numbers and objects are accepted:</p>
<pre><code>BitVector.prototype.enable = function(x) &#123;<br></br>
if (typeof x === "number") &#123;<br></br>
this.enableBit(x);<br></br>
&#125; else if (typeof x === "object" && x) &#123;<br></br>
for (var i = 0, n = x.length; i &#60; n; i++) &#123;<br></br>
this.enableBit(x[i]);<br></br>
&#125;<br></br>
&#125; else &#123;<br></br>
throw new TypeError("expected number or array-like");<br></br>
&#125;<br></br>
&#125;</code></pre>
<p className="it">Esta última versión de habilitar es un ejemplo de un estilo más cauteloso conocido como programación defensiva, que intenta defenderse contra posibles errores con controles adicionales. En general, no es posible defenderse contra todos los errores posibles. Por ejemplo, también podríamos comprobar que si x es un objeto también tiene una propiedad length, pero esto no protegería contra, digamos, un uso accidental de un objeto String. Y JavaScript proporciona sólo herramientas muy rudimentarias para implementar estas comprobaciones, como el operador typeof, pero es posible escribir funciones de utilidad para proteger las firmas de funciones de forma más concisa. Por ejemplo, podríamos proteger el constructor BitVector con una sola comprobación inicial:</p><p className="p">This last version of enable is an example of a more cautious style known as defensive programming, which attempts to defend against potential errors with additional checks. In general, it’s not possible to defend against all possible bugs. For example, we could also check to ensure that if x is an object it also has a length property, but this wouldn’t protect against, say, an accidental use of a String object. And JavaScript provides only very rudimentary tools for implementing these checks, such as the typeof operator, but it’s possible to write utility functions to guard function signatures more concisely. For example, we could guard the BitVector constructor with a single up-front check:</p>
<pre><code>function BitVector(x) &#123; uint32.or(arrayLike).guard(x);<br></br>
// ...<br></br>
&#125;</code></pre>
<p className="it">Para hacer este trabajo, podemos construir una biblioteca de utilidad de objetos de guardia con la ayuda de un objeto de prototipo compartido que implementa el método de guardia:</p><p className="p">To make this work, we can build a utility library of guard objects with the help of a shared prototype object that implements the guard method:</p>
<pre><code>var guard = &#123;<br></br>
guard: function(x) &#123;<br></br>
if (!this.test(x)) &#123;<br></br>
<br></br>
<br></br>
throw new TypeError("expected " + this);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;;</code></pre>
<p className="it">Cada objeto de protección implementa su propio método de prueba y descripción de cadena para mensajes de error:</p><p className="p">Each guard object then implements its own test method and string description for error messages:</p>
<pre><code>var uint32 = Object.create(guard);<br></br>
<br></br>
uint32.test = function(x) &#123;<br></br>
return typeof x === "number" && x === (x &#62;&#62;&#62; 0);<br></br>
&#125;;<br></br>
<br></br>
uint32.toString = function() &#123;<br></br>
return "uint32";<br></br>
&#125;;</code></pre>
<p className="it">El protector uint32 usa un truco de los operadores bit a bit de JavaScript para realizar una conversión a un entero sin signo de 32 bits. El operador de desplazamiento a la derecha no firmado convierte su primer argumento en un entero sin signo de 32 bits antes de realizar un cambio de bit (consulte el ítem 2). El cambio por cero bits entonces no tiene ningún efecto sobre el valor entero. Así, uint32.test compara efectivamente un número con el resultado de convertirlo a un entero sin signo de 32 bits.</p><p className="p">The uint32 guard uses a trick of JavaScript’s bitwise operators to perform a conversion to an unsigned 32-bit integer. The unsigned right shift operator converts its first argument to an unsigned 32-bit integer before performing a bitwise shift (see Item 2). Shifting by zero bits then has no effect on the integer value. So uint32.test effectively compares a number to the result of converting it to an unsigned 32-bit integer.</p>
<p className="it">A continuación, podemos implementar el objeto de protección arrayLike:</p><p className="p">Next we can implement the arrayLike guard object:</p>
<pre><code>var arrayLike = Object.create(guard);<br></br>
<br></br>
arrayLike.test = function(x) &#123;<br></br>
return typeof x === "object" && x && uint32.test(x.length);<br></br>
&#125;;<br></br>
<br></br>
arrayLike.toString = function() &#123;<br></br>
return "array-like object";<br></br>
&#125;;</code></pre>
<p className="it">Tenga en cuenta que hemos tomado la programación defensiva un paso más aquí, asegurando que un objeto de tipo array tenga una propiedad de longitud entera sin signo.</p><p className="p">Notice that we have taken defensive programming one step further here, ensuring that an array-like object should have an unsigned integer length property.</p>
<p className="it">Por último, podemos implementar métodos de "encadenamiento" (ver Item 60), como</p><p className="p">Lastly, we can implement “chaining” methods (see Item 60), such as</p>
<pre><code>or, as prototype methods:<br></br>
guard.or = function(other) &#123;<br></br>
var result = Object.create(guard);<br></br>
<br></br>
<br></br>
var self = this; result.test = function(x) &#123;<br></br>
return self.test(x) || other.test(x);<br></br>
&#125;;<br></br>
<br></br>
var description = this + " or " + other; result.toString = function() &#123;<br></br>
return description;<br></br>
&#125;;<br></br>
<br></br>
return result;<br></br>
&#125;;</code></pre>
<p className="it">Este método combina el objeto de protección de receptor (el objeto enlazado a éste) con un segundo objeto de protección (el otro parámetro), produciendo un nuevo objeto de guardia, cuyos métodos de prueba y toString combinan los métodos de los dos objetos de entrada. Observe que usamos una auto variable local para guardar una referencia a esto (vea los ítems 25 y 37) para su uso dentro del método de prueba del objeto de protección resultante.</p><p className="p">This method combines the receiver guard object (the object bound to this) with a second guard object (the other parameter), producing a new guard object whose test and toString methods combine the two input objects’ methods. Notice that we use a local self variable to save a reference to this (see Items 25 and 37) for use inside the resultant guard object’s test method.</p>
<p className="it">Estas pruebas pueden ayudar a detectar errores más temprano cuando se producen, lo que los hace mucho más fácil de diagnosticar. Sin embargo, pueden obstruir una base de código y potencialmente afectar el rendimiento de la aplicación. Si usar la programación defensiva es una cuestión de costo (el número de pruebas adicionales que tiene que escribir y ejecutar) versus beneficio (el número de errores que captura antes, ahorrando tiempo de desarrollo y depuración).</p><p className="p">These tests can help catch bugs earlier when they crop up, which makes them significantly easier to diagnose. Nevertheless, they can clutter a codebase and potentially affect application performance. Whether to use defensive programming is a question of cost (the number of extra tests you have to write and execute) versus benefit (the number of bugs you catch earlier, saving development and debugging time).</p>
<h3>Things to Remember</h3>
<p className="it">Evite mezclar coacciones con sobrecarga.</p><p className="p">Avoid mixing coercions with overloading.</p>
<p className="it">Considere resguardarse defensivamente contra insumos inesperados.</p><p className="p">Consider defensively guarding against unexpected inputs.</p>
<h3>Item 60: Support Method Chaining</h3>
<p className="it">Parte del poder de las API sin estado (véase el ítem 56) es su flexibilidad para construir operaciones compuestas de las más pequeñas. Un gran ejemplo es el método de sustitución de cadenas. Dado que el resultado es una cadena, podemos realizar múltiples sustituciones llamando repetidamente a replace en el resultado de la llamada al método anterior. Un uso común de este patrón es para reemplazar caracteres especiales de una cadena antes de insertarlo en HTML:</p><p className="p">Part of the power of stateless APIs (see Item 56) is their flexibility for building compound operations out of smaller ones. A great example  is the replace method of strings. Since the result is itself a string, we can perform multiple replacements by repeatedly calling replace on the result of the previous method call. A common usage of this pattern is for replacing special characters of a string before inserting it into HTML:</p>
<pre><code>function escapeBasicHTML(str) &#123;<br></br>
return str.replace(/&/g, "&amp;")<br></br>
.replace(/&#60;/g, "&lt;")<br></br>
<br></br>
<br></br>
.replace(/&#62;/g, "&gt;")<br></br>
.replace(/"/g, "&quot;")<br></br>
.replace(/'/g, "&apos;");<br></br>
&#125;</code></pre>
<p className="it">La primera llamada a reemplazar devuelve una cadena con todas las instancias del carácter especial "&amp;" reemplazado por la secuencia de escape HTML "&amp;"; La segunda llamada entonces reemplaza cualquier instancia de "&lt;" con la secuencia de escape "&lt;", y así sucesivamente. Este estilo de llamadas a métodos repetidos se conoce como encadenamiento de métodos. No es necesario escribir en este estilo, pero es mucho más conciso que guardar cada resultado intermedio en una variable intermedia:</p><p className="p">The first call to replace returns a string with all instances of the special character "&" replaced with the HTML escape sequence "&amp;"; the second call then replaces any instances of "&#60;" with the escape sequence "&lt;", and so on. This style of repeated method calls is known as method chaining. It’s not necessary to write in this style, but it’s much more concise than saving each intermediate result to an intermediate variable:</p>
<pre><code>function escapeBasicHTML(str1) &#123;<br></br>
var str2 = str1.replace(/&/g, "&amp;"); var str3 = str2.replace(/&#60;/g, "&lt;"); var str4 = str3.replace(/&#62;/g, "&gt;"); var str5 = str4.replace(/"/g, "&quot;"); var str6 = str5.replace(/'/g, "&apos;"); return str6;<br></br>
&#125;</code></pre>
<p className="it">La eliminación de las variables temporales hace más claro para los lectores del código que los resultados intermedios sólo son importantes como un paso en el camino hacia el resultado final.</p><p className="p">Eliminating the temporary variables makes it clearer to readers of the code that the intermediate results are only important as a step along the way to the final result.</p>
<p className="it">El encadenamiento de métodos se puede utilizar siempre que una API produzca objetos de alguna interfaz (ver Item 57) con métodos que producen más objetos, a menudo de la misma interfaz. Los métodos de iteración de array descritos en los ítems 50 y 51 son otro gran ejemplo de una API "encadenable":</p><p className="p">Method chaining can be used whenever an API produces objects of some interface (see Item 57) with methods that produce more objects, often of the same interface. The array iteration methods described in Items 50 and 51 are another great example of a “chainable” API:</p>
<pre><code>var users = records.map(function(record) &#123;<br></br>
return record.username;<br></br>
&#125;)<br></br>
.filter(function(username) &#123;<br></br>
return !!username;<br></br>
&#125;)<br></br>
.map(function(username) &#123;<br></br>
return username.toLowerCase();<br></br>
&#125;);</code></pre>
<p className="it">Esta operación encadenada toma una matriz de objetos que representan registros de usuario, extrae la propiedad de nombre de usuario de cada registro, filtra cualquier nombre de usuario vacío y finalmente convierte los nombres de usuario en cadenas en minúsculas.</p><p className="p">This chained operation takes an array of objects representing user records, extracts the username property of each record, filters out any empty usernames, and finally converts the usernames to lowercase strings.</p>
<p className="it">Este estilo es tan flexible y expresivo para los consumidores de una API, que vale la pena diseñar su API para apoyarla. A menudo, en APIs sin estado, "chainability" cae como una consecuencia natural: Si su API no modifica un objeto tiene que devolver un nuevo objeto. Como resultado, obtiene una API cuyos métodos producen más objetos con conjuntos de métodos similares.</p><p className="p">This style is so flexible and expressive for consumers of an API, that it’s worth designing your API to support it. Often, in stateless APIs, “chainability” falls out as a natural consequence: If your API does not modify an object it has to return a new object. As a result, you get  an API whose methods all produce more objects with similar sets of methods.</p>
<p className="it">El encadenamiento de métodos también es útil para dar soporte en un entorno con estado. El truco aquí es para los métodos que actualizan un objeto para devolver esto en lugar de undefined. Esto hace posible realizar múltiples actualizaciones sobre el mismo objeto a través de una secuencia de llamadas al método encadenado:</p><p className="p">Method chaining is also useful to support in a stateful setting. The trick here is for methods that update an object to return this instead of undefined. This makes it possible to perform multiple updates on the same object via a sequence of chained method calls:</p>
<pre><code>element.setBackgroundColor("yellow")<br></br>
.setColor("red")<br></br>
.setFontWeight("bold");</code></pre>
<p className="it">El encadenamiento de métodos para API con estado se conoce a veces como el estilo fluido. (El término fue acuñado por los programadores que simulan Smalltalk "método de cascadas", una sintaxis incorporada para llamar a múltiples métodos en un solo objeto.) Si los métodos de actualización no devuelven esto, entonces el usuario de la API tiene que repetir el nombre de El objeto cada vez. Si el objeto es simplemente nombrado por una variable, esto no hace mucha diferencia. Pero cuando se combinan métodos sin estado que recuperan objetos con métodos de actualización, el encadenamiento de métodos puede hacer que el código sea muy conciso y legible. La biblioteca de front-end jQuery popularizó este enfoque con un conjunto de métodos (sin estado) para "consultar" una página web para elementos de interfaz de usuario y un conjunto de métodos (con estado) para actualizar esos elementos:</p><p className="p">Method chaining for stateful APIs is sometimes known as the fluent style. (The term was coined by programmers simulating Smalltalk’s “method cascades”; a built-in syntax for calling multiple methods on a single object.) If the update methods do not return this, then the user of the API has to repeat the name of the object each time. If the object is simply named by a variable, this doesn’t make much difference. But when combining stateless methods that retrieve objects with update methods, method chaining can make for very concise and readable code. The front-end library jQuery popularized this approach with a set of (stateless) methods for “querying” a web page for user interface elements and a set of (stateful) methods for updating those elements:</p>
<pre><code>$("#notification")	// find notification element<br></br>
.html("Server not responding.") // set notification message<br></br>
.removeClass("info")	// remove one set of styling<br></br>
.addClass("error");	// add more styling</code></pre>
<p className="it">Dado que las llamadas stateful a los métodos html, removeClass y addClass soportan el estilo fluido al devolver el mismo objeto, ni siquiera tenemos que crear una variable temporal para el resultado de la consulta realizada por la función jQuery ($). Por supuesto, si los usuarios encuentran este estilo demasiado terso, siempre pueden introducir una variable para nombrar el resultado de la consulta:</p><p className="p">Since the stateful calls to the html, removeClass, and addClass methods support the fluent style by returning the same object, we don’t even have to create a temporary variable for the result of the query performed by the jQuery function ($). Of course, if users find this style too terse, they can always introduce a variable to name the result of the query:</p>
<pre><code>var element = $("#notification"); element.html("Server not responding."); element.removeClass("info"); element.addClass("error");</code></pre>
<p className="it">Pero al apoyar el encadenamiento de métodos, la API permite a los programadores decidir por sí mismos qué estilo prefieren. Si los métodos devueltos indefinidos, los usuarios se verían obligados a escribir en el estilo más detallado.</p><p className="p">But by supporting method chaining, the API allows programmers to decide for themselves which style they prefer. If the methods returned undefined, users would be forced to write in the more verbose style.</p>
<h3>Things to Remember</h3>
<p className="it">Utilice el método de encadenamiento para combinar las operaciones sin estado.</p><p className="p">Use method chaining to combine stateless operations.</p>
<p className="it">Apoyo de método de encadenamiento mediante el diseño de métodos apátridas que producen nuevos objetos.</p><p className="p">Support method chaining by designing stateless methods that produce new objects.</p>
<p className="it">Encadenamiento de método de soporte en métodos stateful devolviendo esto.</p><p className="p">Support method chaining in stateful methods by returning this.</p>
</div>
</div>
  </Layout>
)
