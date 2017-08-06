import Layout from '../components/layout'

export default () => (
  <Layout title='Chapter 7'>
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
<p className="chapter">Chapter 7</p>
<h1>Concurrency</h1>
<p className="it">JavaScript fue diseñado como un lenguaje de scripts incrustado. Los programas JavaScript no se ejecutan como aplicaciones independientes, sino como scripts en el contexto de una aplicación más grande. El ejemplo más importante es, por supuesto, el navegador web. Un navegador puede tener muchas ventanas y pestañas ejecutando múltiples aplicaciones web, cada una respondiendo a varias entradas y estímulos: acciones del usuario a través del teclado, el ratón o el tacto, la llegada de datos de la red o alarmas programadas. Estos eventos pueden ocurrir en cualquier momento, incluso simultáneamente, durante la vida útil de una aplicación web. Y para cada tipo de evento, la aplicación puede desear ser notificada de la información y responder con un comportamiento personalizado.</p>

<p className="p">JavaScript was designed as an embedded scripting language. JavaScript programs do not run as stand-alone applications, but as scripts in the context of a larger application. The flagship example  is, of course, the web browser. A browser can have many windows and tabs running multiple web applications, each responding to various inputs and stimuli: user actions via keyboard, mouse, or touch, the arrival of data from the network, or timed alarms. These events can occur at any point—even simultaneously—during the lifetime of a web application. And for each kind of event, the application may wish to be notified of information and respond with custom behavior.</p>
<p className="it">El enfoque de JavaScript para escribir programas que responden a múltiples eventos simultáneos es notablemente fácil de usar y potente, usando una combinación de un modelo de ejecución simple, a veces conocido como eventqueue o concurrencia de bucle de eventos, con lo que se conoce como API asíncronas. Gracias a la eficacia de este enfoque, así como al hecho de que JavaScript está estandarizado independientemente de los navegadores web, JavaScript se utiliza como lenguaje de programación para una variedad de otras aplicaciones, desde aplicaciones de escritorio hasta marcos de servidores como Node.js.</p>

<p className="p">JavaScript’s approach to writing programs that respond to multiple concurrent events is remarkably user-friendly and powerful, using a combination of a simple execution model, sometimes known as eventqueue or event-loop concurrency, with what are known as asynchronous APIs. Thanks to the effectiveness of this approach, as well as the fact that JavaScript is standardized independently of web browsers, JavaScript is used as the programming language for a variety of other applications, from desktop applications to server-side frameworks such as Node.js.</p>
<p className="it">Curiosamente, el estándar de ECMAScript, hasta la fecha, nunca dijo una palabra sobre concurrencia. En consecuencia, este capítulo trata de las características "de facto" de JavaScript en lugar de las normas oficiales. Sin embargo, la mayoría de los ambientes JavaScript comparten el mismo enfoque de concurrencia, y las versiones futuras de la norma pueden estandarizar este modelo de ejecución ampliamente implementado. Independientemente del estándar, trabajar con eventos y API asíncronas es una parte fundamental de la programación en JavaScript.</p>

<p className="p">Curiously, the ECMAScript standard has, to date, never said a word about concurrency. Consequently, this chapter deals with “de facto” characteristics of JavaScript rather than the official standard. Nevertheless, most JavaScript environments share the same approach to concurrency, and future versions of the standard may standardize on this widely implemented execution model. Regardless of the standard, working with events and asynchronous APIs is a fundamental part of programming in JavaScript.</p>
<h3>Item 61: Don’t Block the Event Queue on I/O</h3>
<p className="it">Los programas JavaScript se estructuran en torno a eventos: entradas que pueden venir simultáneamente desde una variedad de fuentes externas, como interacciones de un usuario (clic con el botón del ratón, presionando una tecla o tocando una pantalla), datos de red entrantes o alarmas programadas. En algunos idiomas, es costumbre escribir código que espera una entrada en particular:</p>

<p className="p">JavaScript programs are structured around events: inputs that may come in simultaneously from a variety of external sources, such as interactions from a user (clicking a mouse button, pressing a key, or touching a screen), incoming network data, or scheduled alarms. In some languages, it’s customary to write code that waits for a particular input:</p>
<pre><code>var text = downloadSync("http://example.com/file.txt"); console.log(text);</code></pre>
<p className="it">(La API console.log es una utilidad común en las plataformas JavaScript para imprimir la información de depuración en una consola de desarrollador.) Funciones como descargarSync se conocen como síncronas o bloqueo: El programa deja de realizar cualquier trabajo mientras espera su ingreso Este caso, el resultado de la descarga de un archivo a través de Internet. Dado que el ordenador podría estar realizando otro trabajo útil mientras espera que se complete la descarga, tales lenguajes proporcionan típicamente al programador una forma de crear múltiples subprocesos: subcomputaciones que se ejecutan simultáneamente, permitiendo que una parte del programa se detenga y espere ( "Bloquear") una entrada lenta, mientras que otra parte del programa puede continuar haciendo un trabajo independiente.</p>

<p className="p">(The console.log API is a common utility in JavaScript platforms for printing out debugging information to a developer console.) Functions such as downloadSync are known as synchronous, or blocking: The program stops doing any work while it waits for its input—in this case, the result of downloading a file over the internet. Since the computer could be doing other useful work while it waits for the download to complete, such languages typically provide the programmer with   a way to create multiple threads: subcomputations that are executed concurrently, allowing one portion of the program to stop and wait  for (“block on”) a slow input while another portion of the program can carry on usefully doing independent work.</p>
<p className="it">En JavaScript, la mayoría de las operaciones de E / S se proporcionan a través de API asincrónicas o no bloqueadoras. En lugar de bloquear un subproceso en un resultado, el programador proporciona una devolución de llamada (véase el ítem 19) para que el sistema invoque una vez que llega la entrada:</p>

<p className="p">In JavaScript, most I/O operations are provided through asynchronous, or nonblocking APIs. Instead of blocking a thread on a result, the programmer provides a callback (see Item 19) for the system to invoke once the input arrives:</p>
<pre><code>
downloadAsync("http://example.com/file.txt", function(text) &#123; console.log(text);<br></br>
&#125;);
</code></pre>
<p className="it">En lugar de bloquear en la red, esta API inicia el proceso de descarga y luego vuelve inmediatamente después de almacenar la devolución de llamada en un registro interno. En algún momento posterior, cuando la descarga se haya completado, el sistema llama a la devolución de llamada registrada, pasándole el texto del archivo descargado como argumento.</p>

<p className="p">Rather than blocking on the network, this API initiates the download process and then immediately returns after storing the callback in an internal registry. At some point later, when the download has completed, the system calls the registered callback, passing it the text of the downloaded file as its argument.</p>
<p className="it">Ahora, el sistema no sólo salta directamente y llama a la devolución de llamada en el instante en que se completa la descarga. A veces se describe que JavaScript proporciona una garantía de ejecución: cualquier código de usuario que se esté ejecutando actualmente en un contexto compartido, como una sola página web en un navegador o una única instancia en ejecución de un servidor web, se puede terminar Ejecutándose antes de que se invoque el siguiente controlador de eventos. En efecto, el sistema mantiene una cola interna de eventos a medida que se producen, e invoca las devoluciones de llamada registradas una a la vez.</p>

<p className="p">Now, the system does not just jump right in and call the callback the instant the download completes. JavaScript is sometimes described as providing a run-to-completion guarantee: Any user code that is currently running in a shared context, such as a single web page in a browser, or a single running instance of a web server, is allowed to finish executing before the next event handler is invoked. In effect, the system maintains an internal queue of events as they occur, and invokes any registered callbacks one at a time.</p>
<p className="it">La Figura 7.1 muestra una ilustración de las colas de eventos de ejemplo en las aplicaciones del lado del cliente y del lado del servidor. A medida que los eventos ocurren, se añaden al final de la cola de eventos de la aplicación (en la parte superior del diagrama). El sistema JavaScript ejecuta la aplicación con un bucle de eventos interno que extrae eventos de la parte inferior de la cola -es decir, en el orden en que se recibieron- y llama a cualquier controlador de eventos JavaScript registrado (devoluciones de llamada como la que se pasa a downloadAsync Arriba) uno a la vez, pasando los datos del evento como argumentos a los manejadores.</p>

<p className="p">Figure 7.1 shows an illustration of example event queues in client-side and server-side applications. As events occur, they are added to the end of the application’s event queue (at the top of the diagram). The JavaScript system executes the application with an internal event loop, which plucks events off of the bottom of the queue—that is, in the order in which they were received—and calls any registered JavaScript event handlers (callbacks like the one passed to downloadAsync above) one at a time, passing the event data as arguments to the handlers.</p>
<p className="it">Figura 7.1 Ejemplo de colas de eventos en a) una aplicación de cliente web y un servidor web</p>

<p className="p">Figure 7.1 Example event queues in a) a web client application and a web server</p>
<p className="it">El beneficio de la garantía de ejecución completa es que cuando se ejecuta el código, usted sabe que tiene un control completo sobre el estado de la aplicación: Nunca tendrá que preocuparse de que alguna variable o propiedad de objeto cambie de debajo de usted debido a la ejecución simultánea código. Esto tiene el agradable resultado de que la programación simultánea en JavaScript tiende a ser mucho más fácil que trabajar con threads y bloqueos en lenguajes como C ++, Java o C #.</p>

<p className="p">The benefit of the run-to-completion guarantee is that when your code runs, you know that you have complete control over the application state: You never have to worry that some variable or object property will change out from under you due to concurrently executing code. This has the pleasant result that concurrent programming in JavaScript tends to be much easier than working with threads and locks in languages such as C++, Java, or C#.</p>
<p className="it">A la inversa, el inconveniente de ejecutar a la terminación es que todo y cualquier código que escriba efectivamente mantiene el resto de la aplicación de proceder. En aplicaciones interactivas como el navegador, un manejador de eventos bloqueado impide que cualquier otra entrada de usuario sea manejada e incluso puede impedir la representación de una página, lo que lleva a una experiencia de usuario que no responde. En una configuración de servidor, un controlador bloqueado puede evitar que se procesen otras solicitudes de red, dando lugar a un servidor que no responde.</p>

<p className="p">Conversely, the drawback of run-to-completion is that any and all code you write effectively holds up the rest of the application from proceeding. In interactive applications like the browser, a blocked event handler prevents any other user input from being handled and can even prevent the rendering of a page, leading to an unresponsive user experience. In a server setting, a blocked handler can prevent other network requests from being handled, leading to an unresponsive server.</p>
<p className="it">La regla más importante de JavaScript concurrente nunca es utilizar ninguna API de bloqueo de E / S en medio de la cola de eventos de una aplicación. En el navegador, casi ninguna API de bloqueo está disponible, aunque algunos han entrado tristemente en la plataforma a través de los años. La biblioteca XMLHttpRequest, que proporciona una E / S de red similar a la función downloadAsync anterior, tiene una versión síncrona que se considera mala. Las E / S síncronas tienen consecuencias desastrosas para la interactividad de una aplicación web, evitando que el usuario interactúe con una página hasta que se complete la operación de E / S.</p>

<p className="p">The single most important rule of concurrent JavaScript is never to use any blocking I/O APIs in the middle of an application’s event queue. In the browser, hardly any blocking APIs are even available, although a few have sadly leaked into the platform over the years. The XMLHttpRequest library, which provides network I/O similar to the downloadAsync function above, has a synchronous version that is considered bad form. Synchronous I/O has disastrous consequences for the interactivity of a web application, preventing the user from interacting with a page until the I/O operation completes.</p>
<p className="it">Por el contrario, las API asíncronas son seguras para su uso en un entorno basado en eventos, ya que obligan a la lógica de la aplicación a seguir procesando en un "giro" independiente del bucle de eventos. En los ejemplos anteriores, imagine que se tarda un par de segundos en descargar la URL. En ese tiempo, un enorme número de otros eventos pueden ocurrir. En la implementación síncrona, esos eventos se amontonarían en la cola de eventos, pero el bucle de eventos quedaría bloqueado esperando que el código JavaScript terminara de ejecutarse, evitando el procesamiento de cualquier otro evento. Pero en la versión asíncrona, el código JavaScript registra un manejador de eventos y devuelve inmediatamente, permitiendo que otros manejadores de eventos procesen los eventos intermedios antes de que se complete la descarga.</p>

<p className="p">By contrast, asynchronous APIs are safe for use in an event-based setting, because they force your application logic to continue processing in a separate “turn” of the event loop. In the examples above, imagine that it takes a couple of seconds to download the URL. In that time, an enormous number of other events may occur. In the synchronous implementation, those events would pile up in the event queue, but the event loop would be stuck waiting for the JavaScript code to finish executing, preventing the processing of any other events. But in the asynchronous version, the JavaScript code registers an event handler and returns immediately, allowing other event handlers to process intervening events before the download completes.</p>
<p className="it">En los ajustes donde la cola de eventos de la aplicación principal no se ve afectada, las operaciones de bloqueo son menos problemáticas. Por ejemplo, la plataforma web proporciona la API del trabajador, que hace posible generar computaciones simultáneas. A diferencia de los hilos convencionales, los trabajadores se ejecutan en un estado completamente aislado, sin acceso al ámbito global ni al contenido de la página web del subproceso principal de la aplicación, por lo que no pueden interferir con la ejecución del código que se ejecuta desde la cola de eventos principal. En un trabajador, el uso de la variante síncrona de XMLHttpRequest es menos problemático; El bloqueo de una descarga evita que el Worker continúe, pero no impide que la página se procese o que la cola de eventos responda a los eventos. En una configuración de servidor, las API de bloqueo no son problemáticas durante el inicio, es decir, Antes de que el servidor comience a responder a las solicitudes entrantes. Pero al atender solicitudes, las API de bloqueo son tan catastróficas como en la cola de eventos del navegador.</p>

<p className="p">In settings where the main application’s event queue is unaffected, blocking operations are less problematic. For example, the web platform provides the Worker API, which makes it possible to spawn concurrent computations. Unlike  conventional  threads,  workers  are executed in a completely isolated state, with no access to the global scope or web page contents of the application’s main thread,  so they cannot interfere with the execution of code running in from the main event queue. In a worker, using the synchronous variant of XMLHttpRequest is less problematic; blocking on a download does prevent the Worker from continuing, but it does not prevent the page from rendering or the event queue from responding to events. In a server setting, blocking APIs are unproblematic during startup, that is, before the server begins responding to incoming requests. But when servicing requests, blocking APIs are every bit as catastrophic as in the event queue of the browser.</p>


<h3>Things to Remember</h3>
<p className="it">Las API asíncronas toman devoluciones de llamada para aplazar el procesamiento de operaciones caras y evitar bloquear la aplicación principal.</p>

<p className="p">Asynchronous APIs take callbacks to defer processing of expensive operations and avoid blocking the main application.</p>
<p className="it">JavaScript acepta eventos simultáneamente pero procesa los manejadores de eventos secuencialmente utilizando una cola de eventos.</p>

<p className="p">JavaScript accepts events concurrently but processes event handlers sequentially using an event queue.</p>
<p className="it">Nunca utilice bloqueo de E / S en la cola de eventos de una aplicación.</p>

<p className="p">Never use blocking I/O in an application’s event queue.</p>
<h3>Item 62: Use Nested or Named Callbacks for Asynchronous Sequencing</h3>
<p className="it">El ítem 61 muestra cómo las API asíncronas realizan operaciones de E / S potencialmente costosas sin bloquear la aplicación de continuar haciendo el trabajo y procesando otras entradas. Comprender el orden de las operaciones de los programas asíncronos puede ser un poco confuso al principio. Por ejemplo, este programa imprime "iniciar" antes de imprimir "terminado", aunque las dos acciones aparecen en el orden opuesto en la fuente del programa:</p>

<p className="p">Item 61 shows how asynchronous APIs perform potentially expensive I/O operations without blocking the application from continuing doing work and processing other input. Understanding the order of operations of asynchronous programs can be a little confusing at first. For example, this program prints out "starting" before it prints "finished", even though the two actions appear in the opposite order in the program source:</p>
<pre><code>
downloadAsync("file.txt", function(file) &#123; console.log("finished");<br></br>
&#125;);<br></br>
console.log("starting");
</code></pre>
<p className="it">La llamada downloadAsync devuelve inmediatamente, sin esperar a que el archivo termine de descargarse. Mientras tanto, la garantía de ejecución completa de JavaScript garantiza que la siguiente línea se ejecute antes de ejecutar cualquier otro controlador de eventos. Esto significa que "iniciar" es seguro para imprimir antes de "terminado".</p>

<p className="p">The downloadAsync call returns immediately, without waiting for the file to finish downloading. Meanwhile, JavaScript’s run-to-completion guarantee ensures that the next line executes before any other event handlers are executed. This means that "starting" is sure to print before "finished".</p>
<p className="it">La forma más fácil de entender esta secuencia de operaciones es pensar en una API asíncrona como iniciar en lugar de realizar una operación. El código anterior primero inicia la descarga de un archivo e inmediatamente imprime "iniciar". Cuando se completa la descarga, en algún giro separado del bucle de eventos, el controlador de eventos registrado imprime "terminado".</p>

<p className="p">The easiest way to understand this sequence of operations is to think of an asynchronous API as initiating rather than performing an operation. The code above first initiates the download of a file and then immediately prints out "starting". When the download completes, in some separate turn of the event loop, the registered event handler prints "finished".</p>
<p className="it">Por lo tanto, si la colocación de varias declaraciones en una fila sólo funciona si necesita hacer algo después de iniciar una operación ¿cómo secuenciar las operaciones asincrónicas completadas? Por ejemplo, ¿qué sucede si necesitamos buscar una URL en una base de datos asíncrona y luego descargar el contenido de esa URL? Es imposible iniciar ambas solicitudes de forma consecutiva:</p>

<p className="p">So, if placing several statements in a row only works if you need      to do something after initiating an operation how do you sequence completed asynchronous operations? For example, what if we need  to look up a URL in an asynchronous database and then download the contents of that URL? It’s impossible to initiate both requests back-to-back:</p>
<pre><code>
db.lookupAsync("url", function(url) &#123;<br></br>
// ?<br></br>
&#125;);<br></br>
downloadAsync(url, function(text) &#123; // error: url is not bound<br></br>
console.log("contents of " + url + ": " + text);<br></br>
&#125;);
</code></pre>
<p className="it">Esto no puede funcionar, ya que la URL resultante de la búsqueda de base de datos es necesaria como argumento para descargarAsync, pero no está en el ámbito de aplicación. Y con razón: Todo lo que hemos hecho en ese paso es iniciar la búsqueda de la base de datos; El resultado de la búsqueda simplemente no está disponible todavía.</p>

<p className="p">This can’t possibly work, because the URL resulting from the database lookup is needed as the argument to downloadAsync, but it’s not in scope. And with good reason: All we’ve done at that step is initiate the database lookup; the result of the lookup simply isn’t available yet.</p>
<p className="it">La respuesta más sencilla es usar el anidamiento. Gracias a la potencia de los cierres (ver punto 11), podemos integrar la segunda acción en la devolución de llamada a la primera:</p>

<p className="p">The most straightforward answer is to use nesting. Thanks to the power of closures (see Item 11), we can embed the second action in the callback to the first:</p>
<pre><code>
db.lookupAsync("url", function(url) &#123; downloadAsync(url, function(text) &#123;<br></br>
console.log("contents of " + url + ": " + text);<br></br>
&#125;);<br></br>
&#125;);
</code></pre>
<p className="it">Todavía hay dos devoluciones de llamada, pero la segunda está contenida dentro de la primera, creando un cierre que tiene acceso a las variables de la devolución de llamada externa. Observe cómo la segunda devolución de llamada se refiere a url.</p>

<p className="p">There are still two callbacks, but the second is contained within the first, creating a closure that has access to the outer callback’s variables. Notice how the second callback refers to url.</p>
<p className="it">Anidar operaciones asíncronas es fácil, pero rápidamente se vuelve difícil de manejar cuando se amplía a secuencias más largas:</p>

<p className="p">Nesting asynchronous operations is easy, but it quickly gets unwieldy when scaling up to longer sequences:</p>
<pre><code>db.lookupAsync("url", function(url) &#123; downloadAsync(url, function(file) &#123;<br></br>
downloadAsync("a.txt", function(a) &#123; downloadAsync("b.txt", function(b) &#123;<br></br>
downloadAsync("c.txt", function(c) &#123;<br></br>
// ...<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;);<br></br>
 <br></br>
&#125;);<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;);
</code></pre>
<p className="it">Una forma de mitigar el anidamiento excesivo es levantar las devoluciones de llamada anidadas de nuevo como funciones con nombre y pasarles cualquier dato adicional que necesiten como argumentos adicionales. El ejemplo de dos pasos anterior podría ser reescrito como:</p>

<p className="p">One way to mitigate excessive nesting is to lift nested callbacks back out as named functions and pass them any additional data they need as extra arguments. The two-step example above could be rewritten as:</p>
<pre><code>db.lookupAsync("url", downloadURL);<br></br>
<br></br>
function downloadURL(url) &#123;<br></br>
downloadAsync(url, function(text) &#123; // still nested<br></br>
showContents(url, text);<br></br>
&#125;);<br></br>
&#125;<br></br>
<br></br>
function showContents(url, text) &#123; console.log("contents of " + url + ": " + text);<br></br>
&#125;
</code></pre>
<p className="it">Esto todavía utiliza una devolución de llamada anidada dentro de downloadURL para combinar la variable de url externa con la variable de texto interna como argumentos a showContents. Podemos eliminar esta última devolución de llamada anidada con bind (vea el ítem 25):</p>

<p className="p">This still uses a nested callback inside downloadURL in order to combine the outer url variable with the inner text variable as arguments to showContents. We can eliminate this last nested callback with bind (see Item 25):</p>
<pre><code>
db.lookupAsync("url", downloadURL);<br></br>
<br></br>
function downloadURL(url) &#123;<br></br>
downloadAsync(url, showContents.bind(null, url));<br></br>
&#125;<br></br>
<br></br>
function showContents(url, text) &#123; console.log("contents of " + url + ": " + text);<br></br>
&#125;</code></pre>
<p className="it">Este enfoque conduce a un código más secuencial, pero a costa de tener que nombrar cada paso intermedio de la secuencia y copiar los enlaces de paso a paso. Esto puede resultar incómodo en casos como el ejemplo anterior:</p>

<p className="p">This approach leads to more sequential-looking code, but at the cost of having to name each intermediate step of the sequence and copy bindings from step to step. This can get awkward in cases like the longer example above:</p>
<pre><code>db.lookupAsync("url", downloadURLAndFiles);<br></br>
<br></br>
function downloadURLAndFiles(url) &#123; downloadAsync(url, downloadABC.bind(null, url));<br></br>
&#125;<br></br>
<br></br>
// awkward name<br></br>
function downloadABC(url, file) &#123; downloadAsync("a.txt",<br></br>
// duplicated bindings<br></br>
downloadFiles23.bind(null, url, file));<br></br>
&#125;<br></br>
<br></br>
<br></br>
// awkward name<br></br>
function downloadBC(url, file, a) &#123; downloadAsync("b.txt",<br></br>
// more duplicated bindings<br></br>
downloadFile3.bind(null, url, file, a));<br></br>
&#125;<br></br>
<br></br>
// awkward name<br></br>
function downloadC(url, file, a, b) &#123; downloadAsync("c.txt",<br></br>
// still more duplicated bindings<br></br>
finish.bind(null, url, file, a, b));<br></br>
&#125;<br></br>
<br></br>
function finish(url, file, a, b, c) &#123;<br></br>
// ...<br></br>
&#125;</code></pre>
<p className="it">A veces una combinación de los dos enfoques encuentra un mejor equilibrio, aunque todavía con algunos nidos:</p>

<p className="p">Sometimes a combination of the two approaches strikes a better balance, albeit still with some nesting:</p>
<pre><code>db.lookupAsync("url", function(url) &#123; downloadURLAndFiles(url);<br></br>
&#125;);<br></br>
<br></br>
function downloadURLAndFiles(url) &#123;<br></br>
downloadAsync(url, downloadFiles.bind(null, url));<br></br>
&#125;<br></br>
<br></br>
function downloadFiles(url, file) &#123; downloadAsync("a.txt", function(a) &#123;<br></br>
downloadAsync("b.txt", function(b) &#123; downloadAsync("c.txt", function(c) &#123;<br></br>
// ...<br></br>
<br></br>
<br></br>
<br></br>
&#125;);<br></br>
&#125;<br></br>
 <br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;);</code></pre>
<p className="it">Aún mejor, este último paso se puede mejorar con una abstracción adicional para descargar varios archivos y almacenarlos en una matriz:</p>

<p className="p">Even better, this last step can be improved with an additional abstraction for downloading multiple files and storing them in an array:</p>
<pre><code>function downloadFiles(url, file) &#123;&#92;<br></br> downloadAllAsync(["a.txt", "b.txt", "c.txt"],<br></br>
function(all) &#123;<br></br>
<br></br>
&#125;);<br></br>
&#125;<br></br>
 <br></br>
var a = all[0], b = all[1], c = all[2];<br></br>
// ...<br></br>
</code></pre>
<p className="it">El uso de downloadAllAsync también nos permite descargar múltiples archivos simultáneamente. La secuenciación significa que cada operación no puede iniciarse hasta que no se complete la anterior. Y algunas operaciones son inherentemente secuenciales, como descargar la URL que buscamos de una búsqueda de base de datos. Pero si tenemos una lista de nombres de archivos para descargar, lo más probable es que no haya razón para esperar que cada archivo termine de descargarse antes de solicitar el siguiente. El ítem 66 explica cómo implementar abstracciones simultáneas como descargarAllAsync.</p>

<p className="p">Using downloadAllAsync also allows us to download multiple files concurrently. Sequencing means that each operation cannot even   be initiated until the previous one completes. And some operations are inherently sequential, like downloading the URL we fetched from a database lookup. But if we have a list of filenames to download, chances are there’s no reason to wait for each file to finish downloading before requesting the next. Item 66 explains how to implement concurrent abstractions such as downloadAllAsync.</p>
<p className="it">Más allá de anidar y nombrar callbacks, es posible crear abstracciones de nivel superior para hacer que el flujo de control asíncrono sea más simple y conciso. El punto 68 describe un enfoque particularmente popular. Más allá de eso, vale la pena explorar las bibliotecas de asincronía o experimentar con sus propias abstracciones.</p>

<p className="p">Beyond nesting and naming callbacks, it’s possible to build higherlevel abstractions to make asynchronous control flow simpler and more concise. Item 68 describes one particularly popular approach. Beyond that, it’s worth exploring asynchrony libraries or experimenting with abstractions of your own.</p>


<h3>Things to Remember</h3>
<p className="it">Utilice devoluciones de llamada anidadas o nombradas para realizar varias operaciones asincrónicas en secuencia.</p>

<p className="p">Use nested or named callbacks to perform several asynchronous operations in sequence.</p>
<p className="it">Trate de encontrar un equilibrio entre el anidamiento excesivo de devoluciones de llamada y el nombre incómodo de callbacks no anidados.</p>

<p className="p">Try to strike a balance between excessive nesting of callbacks and awkward naming of non-nested callbacks.</p>
<p className="it">Evite las operaciones de secuenciación que se pueden realizar simultáneamente.</p>

<p className="p">Avoid sequencing operations that can be performed concurrently.</p>
<h3>Item 63: Be Aware of Dropped Errors</h3>
<p className="it">Uno de los aspectos más difíciles de la programación asíncrona para administrar es el manejo de errores. En el código síncrono, es fácil manejar los errores de una sola vez envolviendo una sección de código con un bloque try:</p>

<p className="p">One of the more difficult aspects of asynchronous programming to manage is error handling. In synchronous code, it’s easy to handle errors in one fell swoop by wrapping a section of code with a try block:</p>
<pre><code>try &#123; f();<br></br>
g();<br></br>
h();<br></br>
&#125; catch (e) &#123;<br></br>
// handle any error that occurred...<br></br>
&#125;</code></pre>
<p className="it">Con el código asíncrono, un proceso de varias etapas suele dividirse en vueltas separadas de la cola de eventos, por lo que no es posible envolverlas todas en un solo bloque de prueba. De hecho, las API asíncronas no pueden incluso lanzar excepciones en absoluto, porque en el momento en que se produce un error asincrónico, no hay un contexto de ejecución obvio para lanzar la excepción a! En su lugar, las API asíncronas tienden a representar errores como argumentos especiales para las devoluciones de llamada, o toman devoluciones de llamada de manejo de errores adicionales (a veces denominadas errbacks). Por ejemplo, una API asíncrona para descargar un archivo como el del Item 61 podría tomar una función adicional para ser llamada en caso de un error de red:</p>

<p className="p">With asynchronous code, a multistep process is usually divided into separate turns of the event queue, so it’s not possible to wrap them all in a single try block. In fact, asynchronous APIs cannot even throw exceptions at all, because by the time an asynchronous error occurs, there is no obvious execution context to throw the exception to! Instead, asynchronous APIs tend to represent errors as special arguments to callbacks, or take additional error-handling callbacks (sometimes referred to as errbacks). For example, an asynchronous API for downloading a file like the one from Item 61 might take an extra function to be called in case of a network error:</p>
<pre><code>downloadAsync("http://example.com/file.txt", function(text) &#123;&#92;<br></br> console.log("File contents: " + text);<br></br>
&#125;, function(error) &#123; console.log("Error: " + error);<br></br>
&#125;);</code></pre>
<p className="it">Para descargar varios archivos, puede anidar las devoluciones de llamada como se explica en el ítem 62:</p>

<p className="p">To download several files, you can nest the callbacks as explained in Item 62:</p>
<pre><code>downloadAsync("a.txt", function(a) &#123; downloadAsync("b.txt", function(b) &#123;<br></br>
downloadAsync("c.txt", function(c) &#123; console.log("Contents: " + a + b + c);<br></br>
&#125;, function(error) &#123; console.log("Error: " + error);<br></br>
&#125;);<br></br>
&#125;, function(error) &#123; // repeated error-handling logic<br></br>
console.log("Error: " + error);<br></br>
&#125;);<br></br>
&#125;, function(error) &#123; // repeated error-handling logic<br></br>
console.log("Error: " + error);<br></br>
&#125;);</code></pre>
<p className="it">Observe cómo en este ejemplo, cada paso del proceso utiliza la misma lógica de manejo de errores, pero hemos repetido el mismo código en varios lugares. Como siempre en la programación, debemos esforzarnos por evitar la duplicación de código. Es bastante fácil abstraer esto definiendo una función de manejo de errores en un ámbito compartido:</p>

<p className="p">Notice how in this example, each step of the process uses the same error-handling logic, but we’ve repeated the same code in several places. As always in programming, we should strive to avoid duplicating code. It’s easy enough to abstract this out by defining an error-handling function in a shared scope:</p>
<pre><code>function onError(error) &#123; console.log("Error: " + error);<br></br>
&#125;<br></br>
<br></br>
downloadAsync("a.txt", function(a) &#123; downloadAsync("b.txt", function(b) &#123;<br></br>
downloadAsync("c.txt", function(c) &#123; console.log("Contents: " + a + b + c);<br></br>
&#125;, onError);<br></br>
&#125;, onError);<br></br>
&#125;, onError);</code></pre>
<p className="it">Por supuesto, si combinamos múltiples pasos en una sola operación compuesta con utilidades como descargarAllAsync (como lo recomiendan los ítems 62 y 66), naturalmente terminamos solo la necesidad de proporcionar una sola devolución de llamada de error:</p>

<p className="p">Of course, if we combine multiple steps into a single compound operation with utilities such as downloadAllAsync (as Items 62 and 66 recommend), we naturally end up only needing to provide a single error callback:</p>
<pre><code>downloadAllAsync(["a.txt", "b.txt", "c.txt"], function(abc) &#123;&#92;<br></br> console.log("Contents: " + abc[0] + abc[1] + abc[2]);<br></br>
&#125;, function(error) &#123; console.log("Error: " + error);<br></br>
&#125;);</code></pre>
<p className="it">Otro estilo de API de manejo de errores, popularizado por la plataforma Node.js, toma sólo una única devolución de llamada cuyo primer argumento es un error, si se produjo, o un valor falsy como null de lo contrario. Para este tipo de API, todavía podemos definir una función común de gestión de errores, pero necesitamos proteger cada devolución de llamada con una instrucción if:</p>

<p className="p">Another style of error-handling API, popularized by the Node.js platform, takes only a single callback whose first argument is either an error, if one occurred, or a falsy value such as null otherwise. For these kinds of APIs, we can still define a common error-handling function, but we need to guard each callback with an if statement:</p>
<pre><code>function onError(error) &#123; console.log("Error: " + error);<br></br>
&#125;<br></br>
<br></br>
downloadAsync("a.txt", function(error, a) &#123;<br></br>
if (error) &#123;<br></br>
onError(error);<br></br>
return;<br></br>
&#125;<br></br>
downloadAsync("b.txt", function(error, b) &#123;<br></br>
// duplicated error-checking logic<br></br>
if (error) &#123;<br></br>
onError(error);<br></br>
return;<br></br>
&#125;<br></br>
downloadAsync(url3, function(error, c) &#123;<br></br>
// duplicated error-checking logic<br></br>
if (error) &#123;<br></br>
onError(error);<br></br>
return;<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;);<br></br>
 <br></br>
&#125;);<br></br>
 <br></br>
&#125;<br></br>
console.log("Contents: " + a + b + c);</code></pre>
<p className="it">En los marcos con este estilo de devolución de llamada de error, los programadores suelen abandonar las convenciones que requieren que las sentencias para abarcar varias líneas con los cuerpos reforzados, lo que conduce a un manejo de errores más conciso y menos distracción:</p>

<p className="p">In frameworks with this style of error callback, programmers often abandon conventions requiring if statements to span multiple lines with braced bodies, leading to more concise, less distracting error handling:</p>
<pre><code>function onError(error) &#123; console.log("Error: " + error);<br></br>
&#125;<br></br>
<br></br>
downloadAsync("a.txt", function(error, a) &#123;<br></br>
if (error) return onError(error);<br></br>
<br></br>
downloadAsync("b.txt", function(error, b) &#123;<br></br>
if (error) return onError(error);<br></br>
<br></br>
downloadAsync(url3, function(error, c) &#123;<br></br>
if (error) return onError(error);<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;);<br></br>
 <br></br>
&#125;);<br></br>
 <br></br>
console.log("Contents: " + a + b + c);</code></pre>
<p className="it">O, como siempre, la combinación de pasos con una abstracción ayuda a eliminar la duplicación:</p>

<p className="p">Or, as always, combining steps with an abstraction helps eliminate duplication:</p>
<pre><code>var filenames = ["a.txt", "b.txt", "c.txt"];<br></br>
<br></br>
downloadAllAsync(filenames, function(error, abc) &#123;<br></br>
if (error) &#123;<br></br>
console.log("Error: " + error);<br></br>
return;<br></br>
<br></br>
<br></br>
<br></br>
&#125;);<br></br>
 <br></br>
&#125;<br></br>
console.log("Contents: " + abc[0] + abc[1] + abc[2]);</code></pre>
<p className="it">Una de las diferencias prácticas entre try ... catch y la típica lógica de manejo de errores en APIs asíncronas es que intenta facilitar la definición de la lógica "catchall" de modo que es difícil olvidar manejar errores en toda una región de código. Con APIs asíncronas como la anterior, es muy fácil olvidarse de proporcionar el manejo de errores en cualquiera de los pasos del proceso. A menudo, esto resulta en un error que se cae silenciosamente. Un programa que ignora los errores puede ser muy frustrante para los usuarios: la aplicación no proporciona ningún comentario de que algo salió mal (a veces resultando en una notificación de progreso pendiente que nunca borra). Del mismo modo, los errores silenciosos son una pesadilla para depurar, ya que no proporcionan pistas sobre la fuente del problema. La mejor cura es la prevención:</p>

<p className="p">One of the practical differences between try...catch and typical error-handling logic in asynchronous APIs is that try makes it easier to define “catchall” logic so that it’s difficult to forget to handle errors in an entire region of code. With asynchronous APIs like the one above, it’s very easy to forget to provide error handling in any of the steps of the process. Often, this results in an error getting silently dropped. A program that ignores errors can be very frustrating for users: The application provides no feedback that something went wrong (sometimes resulting in a hanging progress notification that never clears). Similarly, silent errors are a nightmare to debug, since they provide no clues about the source of the problem. The best cure is prevention: Working with asynchronous APIs requires vigilance to make sure you handle all error conditions explicitly.</p>


<h3>Things to Remember</h3>
<p className="it">Evite copiar y pegar código de manejo de errores escribiendo funciones compartidas de manejo de errores.</p>

<p className="p">Avoid copying and pasting error-handling code by writing shared error-handling functions.</p>
<p className="it">Asegúrese de manejar todas las condiciones de error explícitamente para evitar errores eliminados.</p>

<p className="p">Make sure to handle all error conditions explicitly to avoid dropped errors.</p>
<h3>Item 64: Use Recursion for Asynchronous Loops</h3>
<p className="it">Considere una función que toma una matriz de direcciones URL e intenta descargar una de cada vez hasta que una tenga éxito. Si la API fuera síncrona, sería fácil de implementar con un bucle:</p>

<p className="p">Consider a function that takes an array of URLs and tries to download one at a time until one succeeds. If the API were synchronous, it would be easy to implement with a loop:</p>
<pre><code>function downloadOneSync(urls) &#123;<br></br>
for (var i = 0, n = urls.length; i &#60; n; i++) &#123;<br></br>
try &#123;<br></br>
return downloadSync(urls[i]);<br></br>
&#125; catch (e) &#123; &#125;<br></br>
&#125;<br></br>
throw new Error("all downloads failed");<br></br>
&#125;</code></pre>
<p className="it">Pero este enfoque no funcionará para downloadOneAsync, porque no podemos suspender un bucle y reanudarlo en una devolución de llamada. Si intentamos utilizar un bucle, se iniciaría todas las descargas en lugar de esperar a que uno continúe antes de intentar el siguiente:</p>

<p className="p">But this approach won’t work for downloadOneAsync, because we can’t suspend a loop and resume it in a callback. If we tried using a loop, it would initiate all of the downloads rather than waiting for one to continue before trying the next:</p>
<pre><code>function downloadOneAsync(urls, onsuccess, onerror) &#123;<br></br>
for (var i = 0, n = urls.length; i &#60; n; i++) &#123; downloadAsync(urls[i],&#92;<br></br> onsuccess, function(error) &#123;<br></br>
// ?<br></br>
&#125;);<br></br>
// loop continues<br></br>
&#125;<br></br>
throw new Error("all downloads failed");<br></br>
&#125;</code></pre>
<p className="it">Así que tenemos que implementar algo que actúa como un bucle, pero que no continúa ejecutándose hasta que lo digamos explícitamente. La solución es implementar el bucle como una función, así que podemos decidir cuándo iniciar cada iteración:</p>

<p className="p">So we need to implement something that acts like a loop, but that doesn’t continue executing until we explicitly say so. The solution is to implement the loop as a function, so we can decide when to start each iteration:</p>
<pre><code>function downloadOneAsync(urls, onsuccess, onfailure) &#123;<br></br>
var n = urls.length;<br></br>
<br></br>
function tryNextURL(i) &#123;<br></br>
if (i &#62;= n) &#123;<br></br>
<br></br>
<br></br>
onfailure("all downloads failed");<br></br>
return;<br></br>
&#125;<br></br>
downloadAsync(urls[i], onsuccess, function() &#123; tryNextURL(i + 1);<br></br>
&#125;);<br></br>
&#125;<br></br>
<br></br>
tryNextURL(0);<br></br>
&#125;</code></pre>
<p className="it">La función tryNextURL local es recursiva: su implementación implica una llamada a sí mismo. Ahora, en entornos JavaScript típicos, una función recursiva que se llama de forma síncrona puede fallar después de demasiadas llamadas a sí misma. Por ejemplo, esta función recursiva simple intenta llamarse 100.000 veces, pero en la mayoría de los entornos de JavaScript falla con un error de tiempo de ejecución:</p>

<p className="p">The local tryNextURL function is recursive: Its implementation involves a call to itself. Now, in typical JavaScript environments, a recursive function that calls itself synchronously can fail after too many calls to itself. For example, this simple recursive function tries to call itself 100,000 times, but in most JavaScript environments it fails with a runtime error:</p>
<pre><code>function countdown(n) &#123;<br></br>
if (n === 0) &#123;<br></br>
return "done";<br></br>
&#125; else &#123;<br></br>
return countdown(n – 1);<br></br>
&#125;<br></br>
&#125;<br></br>
<br></br>
countdown(100000); // error: maximum call stack size exceeded</code></pre>
<p className="it">Entonces, ¿cómo podría el recursivo downloadOneAsync seguro si la cuenta regresiva explota cuando n es demasiado grande? Para responder a esto, vamos a tomar un pequeño desvío y desempaquetar el mensaje de error proporcionado por la cuenta regresiva.</p>

<p className="p">So how could the recursive downloadOneAsync be safe if countdown explodes when n is too large? To answer this, let’s take a small detour and unpack the error message provided by countdown.</p>
<p className="it">Los entornos de JavaScript normalmente reservan una cantidad fija de espacio en la memoria, conocida como la pila de llamadas, para realizar un seguimiento de lo que debe hacer después de regresar de las llamadas de función. Imagínese la ejecución de este pequeño programa:</p>

<p className="p">JavaScript environments usually reserve a fixed amount of space in memory, known as the call stack, to keep track of what to do next after returning from function calls. Imagine executing this little program:</p>
<pre><code>function negative(x) &#123;<br></br>
 return abs(x)	-1;<br></br>
&#125;<br></br>
<br></br>
function abs(x) &#123;<br></br>
return Math.abs(x);<br></br>
&#125;<br></br>
<br></br>
console.log(negative(42));</code></pre>
<p className="it">En el punto de la aplicación donde Math.abs se llama con el argumento 42, hay varias otras llamadas de función en curso, cada una esperando a que otra regrese. La figura 7.2 ilustra la pila de llamadas en este punto. En el punto de cada llamada de función, el símbolo de viñeta (•) representa el lugar en el programa donde una llamada de función ha ocurrido y donde esa llamada volverá a cuando termine. Al igual que la estructura de datos de pila tradicional, esta información sigue un protocolo de "última entrada, primera salida": La llamada de función más reciente que empuja la información sobre la pila (representada como el bastidor más grande de la pila) Fuera de la pila. Cuando Math.abs termina, regresa a la función abs, que retorna a la función negativa, que a su vez vuelve al script más externo.</p>

<p className="p">At the point in the application where Math.abs is called with the argument 42, there are several other function calls in progress, each waiting for another to return. Figure 7.2 illustrates the call stack at this point. At the point of each function call, the bullet symbol (•) depicts the place in the program where a function call has occurred and where that call will return to when it finishes. Like the traditional stack data structure, this information follows a “last-in, first-out” protocol: The most recent function call that pushes information onto the stack (represented as the bottommost frame of the stack) will be the first to pop back off the stack. When Math.abs finishes, it returns to the abs function, which returns to the negative function, which in turn returns to the outermost script.</p>
<p className="it">Cuando un programa está en medio de demasiadas llamadas de función, puede quedarse sin espacio en la pila, lo que resulta en una excepción lanzada. Esta condición se conoce como desbordamiento de pila. En nuestro ejemplo, la cuenta regresiva de llamadas (100000) requiere que la cuenta regresiva se llame a sí misma 100.000 veces, cada vez que presiona otro marco de pila, como se muestra en la Figura 7.3. La cantidad de espacio necesario para almacenar tantos cuadros de pila agota el espacio asignado por la mayoría de los entornos de JavaScript, dando lugar a un error de tiempo de ejecución.</p>

<p className="p">When a program is in the middle of too many function calls, it can run out of stack space, resulting in a thrown exception. This condition is known as stack overflow. In our example, calling countdown(100000) requires countdown to call itself 100,000 times, each time pushing another stack frame, as shown in Figure 7.3. The amount of space required to store so many stack frames exhausts the space allocated by most JavaScript environments, leading to a runtime error.</p>
<p className="it">Ahora eche otro vistazo a downloadOneAsync. A diferencia de la cuenta atrás, que no puede devolver hasta que la llamada recursiva vuelve, downloadOneAsync sólo se llama desde una devolución de llamada asincrónica. Recuerde que las API asíncronas se devuelven inmediatamente, antes de invocar sus devoluciones de llamada. Así que devuelve la descarga, haciendo que su marco de pila sea eliminado de la pila de llamadas, antes de que cualquier llamada recursiva haga que un nuevo marco de pila sea empujado hacia atrás en la pila. (De hecho, la devolución de llamada siempre se invoca en un giro separado del bucle de eventos, y cada giro del bucle de eventos invoca su controlador de eventos con la pila de llamadas inicialmente</p>

	<p className="p">Now take another look at downloadOneAsync. Unlike countdown, which can’t return until the recursive call returns, downloadOneAsync only calls itself from within an asynchronous callback. Remember that asynchronous APIs return immediately—before their callbacks are invoked. So downloadOneAsync returns, causing its stack frame to be popped off of the call stack, before any recursive call causes a new stack frame to be pushed back on the stack. (In fact, the callback is always invoked in a separate turn of the event loop, and each turn of the event loop invokes its event handler with the call stack initially</p>
<pre><code> (script start) negative(42) abs(42) Math.abs(42)</code></pre>
<p className="it">Figura 7.2 Una pila de llamadas durante la ejecución de un programa simple</p>

<p className="p">Figure 7.2 A call stack during the execution of a simple program</p>
<pre><code> (script start) countdown(100000) countdown(99999) countdown(99998)<br></br>
<br></br>
countdown(1) countdown(0)</code></pre>
<p className="it">Figura 7.3 Una pila de llamadas durante la ejecución de una función recursiva</p>

<p className="p">Figure 7.3 A call stack during the execution of a recursive function</p>
<p className="it">Vacío.) Así que downloadOneAsync nunca comienza a comer encima del espacio de la pila de la llamada, no importa cuántas iteraciones él requiere.</p>

	<p className="p">empty.) So downloadOneAsync never starts eating up call stack space, no matter how many iterations it requires.</p>


<h3>Things to Remember</h3>
<p className="it">Los bucles no pueden ser asíncronos.</p>

<p className="p">Loops cannot be asynchronous.</p>
<p className="it">Utilice funciones recursivas para realizar iteraciones en vueltas separadas del bucle de eventos.</p>

<p className="p">Use recursive functions to perform iterations in separate turns of the event loop.</p>
<p className="it">La recursión realizada en vueltas separadas del bucle de eventos no desborda la pila de llamadas.</p>

<p className="p">Recursion performed in separate turns of the event loop does not overflow the call stack.</p>
<h3>Item 65: Don’t Block the Event Queue on Computation</h3>
<p className="it">El tema 61 explica cómo las API asíncronas ayudan a impedir que un programa obstruya la cola de eventos de una aplicación. Pero esta no es toda la historia. Después de todo, como cada programador puede decirle, es bastante fácil detener una aplicación sin siquiera una sola llamada de función:</p>

<p className="p">Item 61 explains how asynchronous APIs help to prevent a program from clogging up an application’s event queue. But this is not the whole story. After all, as every programmer can tell you, it’s easy enough to stall an application without even a single function call:</p>
<pre><code>while (true) &#123; &#125;</code></pre>
<p className="it">Y no se necesita un bucle infinito para escribir un programa lento. El código toma tiempo para ejecutarse, y los algoritmos o estructuras de datos ineficientes pueden dar lugar a cálculos de larga duración.</p>

<p className="p">And it doesn’t take an infinite loop to write a sluggish program. Code takes time to run, and inefficient algorithms or data structures can lead to long-running computations.</p>
<p className="it">Por supuesto, la eficiencia no es una preocupación exclusiva de JavaScript. Pero la programación basada en eventos impone restricciones particulares. Para preservar un alto grado de interactividad en una aplicación cliente o para garantizar que todas las solicitudes entrantes reciben un servicio adecuado en una aplicación de servidor, es crítico mantener cada vuelta del ciclo de eventos lo más corta posible. De lo contrario, la cola de eventos puede comenzar a realizar copias de seguridad, creciendo a un ritmo más rápido que los manejadores de eventos pueden enviarse para reducirlo de nuevo. En la configuración del explorador, los cálculos costosos también conducen a una mala experiencia del usuario, ya que la interfaz de usuario de una página casi no responde mientras se ejecuta código JavaScript.</p>

<p className="p">Of course, efficiency is not a concern that’s unique to JavaScript. But event-based programming does impose particular constraints. In order to preserve a high degree of interactivity in a client application, or to ensure that all incoming requests get adequately serviced in a server application, it’s critical to keep each turn of the event loop as short as possible. Otherwise, the event queue can start getting backed up, growing at a faster rate than event handlers can be dispatched to shrink it again. In the browser setting, expensive computations also lead to a bad user experience, since a page’s user interface is mostly unresponsive while JavaScript code is running.</p>
<p className="it">Entonces, ¿qué puede hacer si su aplicación necesita realizar cálculos costosos? No hay una respuesta correcta, pero hay algunas técnicas comunes disponibles. Quizás el enfoque más sencillo es utilizar un mecanismo de simultaneidad como la API de Worker de la plataforma de cliente web. Esto puede ser un buen enfoque para los juegos con inteligencia artificial que pueden necesitar buscar a través de un gran espacio de movimientos posibles. El juego podría comenzar por desovar a un trabajador dedicado para los movimientos de computación:</p>

<p className="p">So what can you do if your application needs to perform expensive computations? There’s no one right answer, but there are a few common techniques available. Perhaps the simplest approach is to use   a concurrency mechanism like the web client platform’s Worker API. This can be a good approach for games with artificial intelligence that may need to search through a large space of possible moves. The game might start up by spawning a dedicated worker for computing moves:</p>
<pre><code>var ai = new Worker("ai.js");</code></pre>
<p className="it">Esto tiene el efecto de generar un nuevo subproceso concurrente de ejecución con su propia cola de eventos independiente, utilizando el archivo fuente ai.js como guión del trabajador. El trabajador se ejecuta en un estado completamente aislado: No tiene acceso directo a ninguno de los objetos de la aplicación. Sin embargo, la aplicación y el trabajador pueden comunicarse entre sí mediante el envío de mensajes entre sí, en forma de cadenas. Así que cada vez que el juego requiere que la computadora haga un movimiento, puede enviar un mensaje al trabajador:</p>

<p className="p">This has the effect of spawning a new concurrent thread of execution with its own separate event queue, using the source file ai.js as the worker’s script. The worker runs in a completely isolated state: It has no direct access to any of the objects of the application. However, the application and worker can communicate with each other by sending messages to each other, in the form of strings. So whenever the game requires the computer to make a move, it can send a message to the worker:</p>
<pre><code>  var userMove = / ...	/;<br></br>
<br></br>
ai.postMessage(JSON.stringify(&#123; userMove: userMove<br></br>
&#125;));</code></pre>
<p className="it">El argumento a postMessage se agrega a la cola de eventos del trabajador como un mensaje. Para procesar las respuestas del trabajador, el juego registra un manejador de eventos:</p>

<p className="p">The argument to postMessage is added to the worker’s event queue as a message. To process responses from the worker, the game registers an event handler:</p>
<pre><code>ai.onmessage = function(event) &#123; executeMove(JSON.parse(event.data).computerMove);<br></br>
&#125;;</code></pre>
<p className="it">Mientras tanto, el archivo fuente ai.js instruye al trabajador a escuchar mensajes y realizar el trabajo requerido para calcular los movimientos siguientes:</p>

<p className="p">Meanwhile, the source file ai.js instructs the worker to listen for messages and perform the work required to compute next moves:</p>
<pre><code>self.onmessage = function(event) &#123;<br></br>
// parse the user move<br></br>
var userMove = JSON.parse(event.data).userMove;<br></br>
<br></br>
// generate the next computer move<br></br>
var computerMove = computeNextMove(userMove);<br></br>
<br></br>
// format the computer move<br></br>
var message = JSON.stringify(&#123; computerMove: computerMove<br></br>
&#125;);<br></br>
<br></br>
self.postMessage(message);<br></br>
&#125;;<br></br>
<br></br>
function computeNextMove(userMove) &#123;<br></br>
// ...<br></br>
&#125;</code></pre>
<p className="it">No todas las plataformas JavaScript proporcionan una API como Worker. Y a veces la sobrecarga de pasar mensajes puede llegar a ser demasiado costoso. Un enfoque diferente es romper un algoritmo en múltiples pasos, cada uno de ellos consistente en un trozo manejable de trabajo. Considere el algoritmo de lista de trabajo del ítem 48 para buscar un gráfico de red social:</p>

<p className="p">Not all JavaScript platforms provide an API like Worker. And sometimes the overhead of passing messages can become too costly. A different approach is to break up an algorithm into multiple steps, each consisting of a manageable chunk of work. Consider the work-list algorithm from Item 48 for searching a social network graph:</p>
<pre><code>Member.prototype.inNetwork = function(other) &#123;<br></br>
var visited = &#123;&#125;;<br></br>
var worklist = [this];<br></br>
while (worklist.length &#62; 0) &#123;<br></br>
var member = worklist.pop();<br></br>
// ...<br></br>
if (member === other) &#123; // found?<br></br>
return true;<br></br>
&#125;<br></br>
// ...<br></br>
&#125;<br></br>
return false;<br></br>
&#125;;</code></pre>
<p className="it">Si el bucle while en el centro de este procedimiento es demasiado caro, la búsqueda podría bloquear la cola de eventos de la aplicación durante períodos de tiempo inaceptablemente largos. Incluso si la API de Worker está disponible, puede resultar costosa o inconveniente implementarla, ya que requiere copiar todo el estado del gráfico de red o almacenar el estado del gráfico en un trabajador y siempre usar el paso de mensajes para actualizar y consultar la red.</p>

<p className="p">If the while loop at the heart of this procedure is too expensive, the search might block the application event queue for unacceptably long periods of time. Even if the Worker API is available, it might be expensive or inconvenient to implement, since it requires either copying the entire state of the network graph or storing the graph state in a worker and always using message passing to update and query the network.</p>
<p className="it">Afortunadamente, el algoritmo se define como una secuencia de pasos individuales: las iteraciones del bucle while. Podemos convertir inNetwork a una función asincrónica agregando un parámetro callback y, como se describe en el Item 64, reemplazando el loop while por una función asincrónica recursiva:</p>

<p className="p">Luckily, the algorithm is defined as a sequence of individual steps: the iterations of the while loop. We can convert inNetwork to an asynchronous function by adding a callback parameter and, as described in Item 64, replacing the while loop with an asynchronous, recursive function:</p>
<pre><code>Member.prototype.inNetwork = function(other, callback) &#123;<br></br>
var visited = &#123;&#125;;<br></br>
var worklist = [this];<br></br>
function next() &#123;<br></br>
if (worklist.length === 0) &#123; callback(false);<br></br>
return;<br></br>
&#125;<br></br>
var member = worklist.pop();<br></br>
// ...<br></br>
if (member === other) &#123; // found?<br></br>
callback(true);<br></br>
return;<br></br>
&#125;<br></br>
// ...<br></br>
setTimeout(next, 0); // schedule the next iteration<br></br>
&#125;<br></br>
setTimeout(next, 0); // schedule the first iteration<br></br>
&#125;;</code></pre>
<p className="it">Examinemos en detalle cómo funciona este código. En lugar del bucle while, hemos escrito una función local llamada next, que tiene la responsabilidad de realizar una sola iteración del bucle y luego programar la siguiente iteración para ejecutar asincrónicamente en la cola de eventos de la aplicación. Esto permite que otros eventos que se hayan producido entretanto se procesen antes de continuar con la siguiente iteración. Cuando la búsqueda es completa, por encontrar un partido o agotar la lista de trabajo, llamamos a la devolución de llamada con el valor de resultado y efectivamente completar el bucle al volver de la siguiente sin programar más iteraciones.</p>

<p className="p">Let’s examine in detail how this code works. In place of the while loop, we’ve written a local function called next, which has the responsibility of performing a single iteration of the loop and then scheduling the next iteration to run asynchronously in the application event queue. This allows other events that have occurred in the meantime to be processed before continuing with the next iteration. When the search is complete, by either finding a match or exhausting the work-list, we call the callback with the result value and effectively complete the loop by returning from next without scheduling anymore iterations.</p>
<p className="it">Para programar iteraciones, estamos utilizando la API setTimeout común, disponible en varias plataformas JavaScript, para registrarse junto a ejecutar después de una cantidad mínima de tiempo transcurrido (0 milisegundos). Esto tiene el efecto de agregar la devolución de llamada a la cola de eventos casi de inmediato. Vale la pena señalar que mientras setTimeout es relativamente portátil en todas las plataformas, a menudo hay una alternativa mejor disponible. En la configuración del navegador, por ejemplo, se reduce realmente a un tiempo de espera mínimo de 4 milisegundos, y hay alternativas utilizando postMessage que enqueue un evento inmediatamente.</p>

<p className="p">To schedule iterations, we are using the common setTimeout API, available in multiple JavaScript platforms, for registering next to run after a minimal amount of elapsed time (0 milliseconds). This has  the effect of adding the callback to the event queue almost right away. It’s worth noting that while setTimeout is relatively portable across platforms, there’s often a better alternative available. In the browser setting, for example, it’s actually throttled to a minimum timeout of 4 milliseconds, and there are alternatives using postMessage that enqueue an event immediately.</p>
<p className="it">Si realizar una sola iteración del algoritmo en cada turno de la cola de eventos de la aplicación es excesiva, podemos afinar el algoritmo para realizar un número personalizado de iteraciones por turno. Esto se logra fácilmente con un simple contador que rodea la porción principal del siguiente:</p>

<p className="p">If performing only one iteration of the algorithm in each turn of the application event queue is overkill, we can tune the algorithm to perform a customized number of iterations per turn. This is easily accomplished with a simple counter loop surrounding the main portion of next:</p>
<pre><code>Member.prototype.inNetwork = function(other, callback) &#123;<br></br>
// ...<br></br>
function next() &#123;<br></br>
for (var i = 0; i &#60; 10; i++) &#123;<br></br>
// ...<br></br>
&#125;<br></br>
setTimeout(next, 0);<br></br>
&#125;<br></br>
setTimeout(next, 0);<br></br>
&#125;;</code></pre>


<h3>Things to Remember</h3>
<p className="it">Evite algoritmos caros en la cola de eventos principal.</p>

<p className="p">Avoid expensive algorithms in the main event queue.</p>
<p className="it">En las plataformas que lo admiten, la API de Worker puede utilizarse para ejecutar cálculos largos en una cola de eventos independiente.</p>

<p className="p">On platforms that support it, the Worker API can be used for running long computations in a separate event queue.</p>
<p className="it">Cuando la API de Worker no está disponible o es demasiado costosa, considere dividir los cálculos en varias vueltas del ciclo de eventos.</p>

<p className="p">When the Worker API is not available or is too costly, consider breaking up computations across multiple turns of the event loop.</p>
<h3>Item 66: Use a Counter to Perform Concurrent Operations</h3>
<p className="it">El ítem 63 sugirió la función de utilidad downloadAllAsync para tomar una matriz de URLs y descargarlas todas, devolviendo la matriz del contenido del archivo, una cadena por URL. Además de limpiar las devoluciones de llamada anidadas, el principal beneficio de downloadAllAsync es descargar archivos simultáneamente: En lugar de esperar a que cada archivo termine de descargarse, podemos iniciar todas las descargas de una sola vez, en un solo giro del bucle de eventos.</p>

<p className="p">Item 63 suggested the utility function downloadAllAsync to take an array of URLs and download them all, returning the array of file contents, one string per URL. Besides cleaning up nested callbacks, downloadAllAsync’s primary benefit is downloading files concurrently: Instead of waiting for each file to finish downloading, we can initiate all the downloads at once, in a single turn of the event loop.</p>
<p className="it">La lógica concurrente es sutil y fácil de equivocarse. Esta es una implementación con un pequeño defecto:</p>

<p className="p">Concurrent logic is subtle and easy to get wrong. Here is an implementation with a devious little flaw:</p>
<pre><code>function downloadAllAsync(urls, onsuccess, onerror) &#123;<br></br>
var result = [], length = urls.length;<br></br>
<br></br>
if (length === 0) &#123; setTimeout(onsuccess.bind(null, result), 0); return;<br></br>
&#125;<br></br>
<br></br>
<br></br>
urls.forEach(function(url) &#123; downloadAsync(url, function(text) &#123;<br></br>
if (result) &#123;<br></br>
// race condition<br></br>
result.push(text);<br></br>
if (result.length === urls.length) &#123; onsuccess(result);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;, function(error) &#123;<br></br>
if (result) &#123;<br></br>
result = null; onerror(error);<br></br>
<br></br>
<br></br>
<br></br>
&#125;);<br></br>
&#125;<br></br>
 <br></br>
&#125;<br></br>
&#125;);</code></pre>
<p className="it">Esta función tiene un error grave, pero primero vamos a ver cómo funciona. Comenzamos asegurando que si la matriz de entrada está vacía, la devolución de llamada se invoca con una matriz de resultados vacía; si no lo hicimos, ninguna de las dos devoluciones se invocaría, ya que el bucle forEach estaría vacío. (El ítem 67 explica por qué llamamos setTimeout para invocar la devolución de llamada onsuccess en lugar de llamarlo directamente). A continuación, iteramos sobre la matriz URL, solicitando una descarga asíncrona para cada uno. Para cada descarga exitosa, agregamos el contenido del archivo a la matriz de resultados; Si todas las URL se han descargado correctamente, llamamos a la devolución de llamada onsuccess con la matriz de resultados completada. Si cualquier descarga falla, invocamos la devolución de llamada onerror con el valor de error. En caso de múltiples descargas fallidas,</p>

<p className="p">This function has a serious bug, but first let’s look at how it works. We  start by ensuring that if the input array is empty,  the callback   is invoked with an empty result array—if we didn’t, neither of the  two callbacks would ever be invoked, since the forEach loop would  be empty. (Item 67 explains why we call setTimeout to invoke the onsuccess callback instead of calling it directly.) Next, we iterate over the URL array, requesting an asynchronous download for each. For each successful download, we add the file contents to the result array; if all URLs have been successfully downloaded, we call the onsuccess callback with the completed result array. If any download fails, we invoke the onerror callback with the error value. In case of multiple failed downloads, we also set the result array to null to make sure that onerror is only called once, for the first error that occurs.</p>
<p className="it">Para ver qué pasa mal, considere un uso como este:</p>

<p className="p">To see what goes wrong, consider a use such as this:</p>
<pre><code>var filenames = [<br></br>
"huge.txt",	// huge file "tiny.txt",	// tiny file "medium.txt" // medium-sized file<br></br>
];<br></br>
downloadAllAsync(filenames, function(files) &#123; console.log("Huge file:&#92;<br></br> " + files[0].length);	// tiny console.log("Tiny file: " + files[1].length);&#92;<br></br>	// medium console.log("Medium file: " + files[2].length); // huge<br></br>
&#125;, function(error) &#123; console.log("Error: " + error);<br></br>
&#125;);</code></pre>
<p className="it">Dado que los archivos se descargan al mismo tiempo, los sucesos pueden ocurrir (y, por consiguiente, agregarse a la cola de sucesos de la aplicación) en órdenes arbitrarias. Si, por ejemplo, tiny.txt completa primero, seguido de medium.txt y luego huge.txt, las devoluciones de llamada instaladas en downloadAllAsync se llamarán en un orden diferente del orden en que se crearon. Sin embargo, la implementación de downloadAllAsync empuja a cada intermedio Resultado en el final de la matriz de resultados tan pronto como llegue. Así que downloadAllAsync produce una matriz que contiene archivos descargados almacenados en una orden desconocida. Es casi imposible usar una API como esa correctamente, porque la persona que llama no tiene forma de averiguar qué resultado es cuál. El ejemplo anterior, que asume que los resultados están en el mismo orden que la matriz de entrada, fallará completamente en este caso.</p>

<p className="p">Since the files are downloaded concurrently, the events can occur (and consequently be added to the application event queue) in arbitrary orders. If, for example, tiny.txt completes first, followed by medium.txt and then huge.txt, the callbacks installed in downloadAllAsync will be called in a different order than the order they were created in.   But the implementation of downloadAllAsync pushes each intermediate result onto the end of the result array as soon as it arrives. So downloadAllAsync produces an array containing downloaded files stored in an unknown order. It’s  almost impossible to use an API like that correctly, because the caller has no way to figure out which result is which. The example above, which assumes the results are  in the same order as the input array, will fail completely in this case.</p>
<p className="it">El punto 48 introdujo la idea del no determinismo: conducta no especificada que los programas no pueden confiar sin comportarse de manera impredecible. Los eventos concurrentes son la fuente más importante de no determinismo en JavaScript. Específicamente, el orden en el que se producen los acontecimientos no se garantiza que sea el mismo de una ejecución de una aplicación a la siguiente.</p>

<p className="p">Item 48 introduced the idea of nondeterminism: unspecified behavior that programs cannot rely on without behaving unpredictably. Concurrent events are the most important source of nondeterminism in JavaScript. Specifically, the order in which events occur is not guaranteed to be the same from one execution of an application to the next.</p>
<p className="it">Cuando una aplicación depende del orden particular de los eventos para funcionar correctamente, se dice que la aplicación sufre una carrera de datos: Varias acciones simultáneas pueden modificar una estructura de datos compartida de forma diferente dependiendo del orden en el que se produzcan. (Intuitivamente, las operaciones simultáneas están "corriendo" unas contra otras para ver quién va a terminar primero). Las carreras de datos son verdaderamente bugs sádicos: Es posible que ni siquiera aparezcan en una prueba en particular, ya que ejecutar el mismo programa dos veces puede resultar en diferentes Comportamiento cada vez. Por ejemplo, el usuario de downloadAllAsync podría intentar reordenar los archivos basándose en cuál era más probable que descargara primero:</p>

<p className="p">When an application depends on the particular order of events to function correctly, the application is said to suffer from a data race: Multiple concurrent actions can modify a shared data structure differently depending on the order in which they occur. (Intuitively, the concurrent operations are “racing” against one another to see who will finish first.) Data races are truly sadistic bugs: They may not even show up in a particular test run, since running the same program twice may result in different behavior each time. For example, the user of downloadAllAsync might try to reorder the files based on which was more likely to download first:</p>
<pre><code>downloadAllAsync(filenames, function(files) &#123;&#92;<br></br> console.log("Huge file: " + files[2].length); console.log("Tiny file: " + files[0].length);&#92;<br></br> console.log("Medium file: " + files[1].length);<br></br>
&#125;, function(error) &#123; console.log("Error: " + error);<br></br>
&#125;);</code></pre>
<p className="it">En este caso, los resultados pueden llegar en el mismo orden la mayor parte del tiempo, pero de vez en cuando, debido quizás a las cargas del servidor o cachés de red cambiantes, los archivos no pueden llegar en el orden esperado. Estos tienden a ser los errores más difíciles de diagnosticar, porque son tan difíciles de reproducir. Por supuesto, podríamos volver a descargar los archivos secuencialmente, pero luego perdemos los beneficios de rendimiento de la concurrencia.</p>

<p className="p">In this case, the results might arrive in the same order most of the time, but from time to time, due perhaps to changing server loads or network caches, the files might not arrive in the expected order. These tend to be the most challenging bugs to diagnose, because they’re so difficult to reproduce. Of course, we could go back to downloading the files sequentially, but then we lose the performance benefits of concurrency.</p>
<p className="it">La solución es implementar downloadAllAsync para que siempre produzca resultados predecibles independientemente del orden impredecible de los eventos. En lugar de empujar cada resultado al final de la matriz, lo almacenamos en su índice original:</p>

<p className="p">The solution is to implement downloadAllAsync so that it always produces predictable results regardless of the unpredictable order of events. Instead of pushing each result onto the end of the array, we store it at its original index:</p>
<pre><code>function downloadAllAsync(urls, onsuccess, onerror) &#123;<br></br>
var length = urls.length;<br></br>
var result = [];<br></br>
<br></br>
if (length === 0) &#123; setTimeout(onsuccess.bind(null, result), 0); return;<br></br>
&#125;<br></br>
<br></br>
urls.forEach(function(url, i) &#123; downloadAsync(url, function(text) &#123;<br></br>
if (result) &#123;<br></br>
result[i] = text; // store at fixed index<br></br>
<br></br>
// race condition<br></br>
if (result.length === urls.length) &#123; onsuccess(result);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;, function(error) &#123;<br></br>
if (result) &#123;<br></br>
result = null; onerror(error);<br></br>
<br></br>
<br></br>
<br></br>
&#125;);<br></br>
&#125;<br></br>
 <br></br>
&#125;<br></br>
&#125;);<br></br>
</code></pre>
<p className="it">Esta implementación se aprovecha del segundo argumento de devolución de llamada forEach, que proporciona el índice de matriz para la iteración actual. Desafortunadamente, todavía no es correcto. El ítem 51 describe el contrato de actualizaciones de matriz: Establecer una propiedad indexada siempre asegura que la propiedad length de la matriz es mayor que ese índice. Imagine una solicitud como:</p>

<p className="p">This implementation takes advantage of the forEach callback’s second argument, which provides the array index for the current iteration. Unfortunately, it’s still not correct. Item 51 describes the contract of array updates: Setting an indexed property always ensures that the array’s length property is greater than that index. Imagine a request such as:</p>
<pre><code>downloadAllAsync(["huge.txt", "medium.txt", "tiny.txt"]);</code></pre>
<p className="it">Si el archivo tiny.txt termina de cargar antes de uno de los otros archivos, la matriz de resultados adquirirá una propiedad en el índice 2, lo que hará que result.length se actualice a 3. La devolución de llamada del éxito del usuario se llamará prematuramente con un array incompleto De los resultados.</p>

<p className="p">If the file tiny.txt finishes loading  before  one  of  the  other  files, the result array will acquire a property at index 2, which causes result.length to be updated to 3. The user’s success callback will then be prematurely called with an incomplete array of results.</p>
<p className="it">La implementación correcta utiliza un contador para realizar un seguimiento del número de operaciones pendientes:</p>

<p className="p">The correct implementation uses a counter to track the number of pending operations:</p>
<pre><code>function downloadAllAsync(urls, onsuccess, onerror) &#123;<br></br>
var pending = urls.length;<br></br>
var result = [];<br></br>
<br></br>
if (pending === 0) &#123; setTimeout(onsuccess.bind(null, result), 0); return;<br></br>
&#125;<br></br>
<br></br>
urls.forEach(function(url, i) &#123; downloadAsync(url, function(text) &#123;<br></br>
if (result) &#123;<br></br>
result[i] = text; // store at fixed index pending--;      // register the success&#92;<br></br> if (pending === 0) &#123;<br></br>
onsuccess(result);<br></br>
&#125;<br></br>
&#125;<br></br>
&#125;, function(error) &#123;<br></br>
if (result) &#123;<br></br>
result = null; onerror(error);<br></br>
<br></br>
<br></br>
<br></br>
&#125;);<br></br>
&#125;<br></br>
 <br></br>
&#125;<br></br>
&#125;);</code></pre>
<p className="it">Ahora, independientemente del orden en que se produzcan los eventos, el contador pendiente indica con precisión cuándo se han completado todos los eventos y los resultados completos se devuelven en el orden correcto.</p>

<p className="p">Now no matter what order the events occur in, the pending counter accurately indicates when all events have completed, and the complete results are returned in the proper order.</p>


<h3>Things to Remember</h3>
<p className="it">Los eventos en una aplicación JavaScript ocurren de forma no determinística, es decir, en un orden impredecible.</p>

<p className="p">Events in a JavaScript application occur nondeterministically, that is, in unpredictable order.</p>
<p className="it">Utilice un contador para evitar carreras de datos en operaciones simultáneas.</p>

<p className="p">Use a counter to avoid data races in concurrent operations.</p>
<h3>Item 67: Never Call Asynchronous Callbacks Synchronously</h3>
<p className="it">Imagine una variación de downloadAsync que mantiene un caché (implementado como Dict-ver el ítem 45) para evitar descargar el mismo archivo varias veces. En los casos en que el archivo ya está en caché, es tentador invocar la devolución de llamada inmediatamente:</p>

<p className="p">Imagine a variation of downloadAsync that keeps a cache (implemented as a Dict—see Item 45) to avoid downloading the same file multiple times. In the cases where the file is already cached, it’s tempting to invoke the callback immediately:</p>
<pre><code>var cache = new Dict();<br></br>
<br></br>
function downloadCachingAsync(url, onsuccess, onerror) &#123;<br></br>
if (cache.has(url)) &#123;<br></br>
onsuccess(cache.get(url)); // synchronous call<br></br>
return;<br></br>
&#125;<br></br>
return downloadAsync(url, function(file) &#123; cache.set(url, file);<br></br>
onsuccess(file);<br></br>
&#125;, onerror);<br></br>
&#125;</code></pre>
<p className="it">Tan natural como pueda parecer proporcionar datos inmediatamente si está disponible, esto viola las expectativas de los clientes de una API asíncrona de maneras sutiles. En primer lugar, cambia el orden esperado de las operaciones. El ítem 62 muestra el siguiente ejemplo, que para una API asincrónica de buen comportamiento siempre debe registrar los mensajes en un orden predecible:</p>

<p className="p">As natural as it may seem to provide data immediately if it’s available, this violates the expectations of an asynchronous API’s clients in subtle ways. First of all, it changes the expected order of operations. Item 62 showed the following example, which for a well-behaved asynchronous API should always log messages in a predictable order:</p>
<pre><code>downloadAsync("file.txt", function(file) &#123; console.log("finished");<br></br>
&#125;);<br></br>
console.log("starting");</code></pre>
<p className="it">Con la implementación naïve de downloadCachingAsync anterior, dicho código de cliente podría terminar registrando los eventos en cualquier orden, dependiendo de si el archivo se ha almacenado en caché:</p>

<p className="p">With the naïve implementation of downloadCachingAsync above, such client code could end up logging the events in either order, depending on whether the file has been cached:</p>
<pre><code>downloadCachingAsync("file.txt", function(file) &#123;&#92;<br></br> console.log("finished"); // might happen first<br></br>
&#125;);<br></br>
console.log("starting");</code></pre>
<p className="it">El orden de los mensajes de registro es una cosa. Más generalmente, el propósito de las API asíncronas es mantener la estricta separación de las vueltas del bucle de eventos. Como se explica en el ítem 61, esto simplifica la concurrencia al aliviar el código en una vuelta del bucle de eventos de tener que preocuparse por otras estructuras de datos compartidas que cambian de código simultáneamente. Una devolución de llamada asíncrona que se llama de forma síncrona viola esta separación, provocando que el código destinado a un giro separado del bucle de eventos se ejecute antes de que finalice el giro actual.</p>

<p className="p">The order of logging messages is one thing. More generally, the purpose of asynchronous APIs is to maintain the strict separation of turns of the event loop. As Item 61 explains, this simplifies concurrency by alleviating code in one turn of the event loop from having   to worry about other code changing shared data structures concurrently. An asynchronous callback that gets called synchronously violates this separation, causing code intended for a separate turn of the event loop to execute before the current turn completes.</p>
<p className="it">Por ejemplo, una aplicación puede mantener una cola de archivos restantes para descargar y mostrar un mensaje al usuario:</p>

<p className="p">For example, an application might keep a queue of files remaining to download and display a message to the user:</p>
<pre><code>downloadCachingAsync(remaining[0], function(file) &#123; remaining.shift();<br></br>
// ...<br></br>
&#125;);<br></br>
<br></br>
status.display("Downloading " + remaining[0] + "...");</code></pre>
<p className="it">Si la llamada se invoca sincrónicamente, el mensaje de la pantalla mostrará el nombre de archivo incorrecto (o peor, "indefinido" si la cola está vacía).</p>

<p className="p">If the callback is invoked synchronously, the display message will show the wrong filename (or worse, "undefined" if the queue is empty).</p>
<p className="it">Invocar una devolución de llamada asincrónica puede causar problemas aún más sutiles. El artículo 64 explica que las devoluciones de llamada asíncronas están destinadas a ser invocadas con una pila de llamadas esencialmente vacías, por lo que es seguro implementar bucles asincrónicos como funciones recursivas sin peligro de acumular espacio de pila de llamadas ilimitado. Una llamada síncrona niega esta garantía, haciendo posible que un bucle ostensiblemente asíncrono escape el espacio de la pila de llamadas. Sin embargo, otro problema es las excepciones: con la implementación anterior de downloadCachingAsync, si la devolución de llamada lanza una excepción, se lanzará en el giro del bucle de eventos que inició la descarga, en lugar de en un giro independiente como se esperaba.</p>

<p className="p">Invoking an asynchronous callback can cause even subtler problems. Item 64 explains that asynchronous callbacks are intended to be invoked with an essentially empty call stack, so it’s safe to implement asynchronous loops as recursive functions without any danger of accumulating unbounded call stack space. A synchronous call negates this guarantee, making it possible for an ostensibly asynchronous loop to exhaust the call stack space. Yet another issue is exceptions: With the above implementation of downloadCachingAsync, if the callback throws an exception, it will be thrown in the turn of the event loop that initiated the download, rather than in a separate turn as expected.</p>
<p className="it">Para garantizar que la devolución de llamada siempre se invoca de forma asíncrona, podemos utilizar una API asíncrona existente. Al igual que lo hicimos en los ítems 65 y 66, usamos la función de biblioteca común setTimeout para agregar una devolución de llamada a la cola de eventos después de un tiempo de espera mínimo. Puede haber alternativas preferibles a setTimeout para programar eventos inmediatos, dependiendo de la plataforma.</p>

<p className="p">To ensure that the callback is always invoked asynchronously, we can use an existing asynchronous API. Just as we did in Items 65 and 66, we use the common library function setTimeout to add a callback to the event queue after a minimum timeout. There may be preferable alternatives to setTimeout for scheduling immediate events, depending on the platform.</p>
<pre><code>var cache = new Dict();<br></br>
<br></br>
function downloadCachingAsync(url, onsuccess, onerror) &#123;<br></br>
if (cache.has(url)) &#123;<br></br>
var cached = cache.get(url); setTimeout(onsuccess.bind(null, cached), 0); return;<br></br>
&#125;<br></br>
return downloadAsync(url, function(file) &#123; cache.set(url, file);<br></br>
onsuccess(file);<br></br>
&#125;, onerror);<br></br>
&#125;</code></pre>
<p className="it">Utilizamos bind (vea el ítem 25) para guardar el resultado como el primer argumento para la devolución de llamada onsuccess.</p>

<p className="p">We use bind (see Item 25) to save the result as the first argument for the onsuccess callback.</p>


<h3>Things to Remember</h3>
<p className="it">Nunca llame a una devolución de llamada asíncrona sincrónicamente, incluso si los datos están inmediatamente disponibles.</p>

<p className="p">Never call an asynchronous callback synchronously, even if the data is immediately available.</p>
<p className="it">La llamada a una devolución de llamada asíncrona interrumpe de forma síncrona la secuencia de operaciones esperada y puede provocar un entrelazado inesperado de código.</p>

<p className="p">Calling an asynchronous callback synchronously disrupts the expected sequence of operations and can lead to unexpected interleaving of code.</p>
<p className="it">Llamar una devolución de llamada asíncrona sincrónicamente puede dar lugar a desbordamientos de pila o excepciones mal gestionadas.</p>

<p className="p">Calling an asynchronous callback synchronously can lead to stack overflows or mishandled exceptions.</p>
<p className="it">Utilice una API asíncrona, como setTimeout, para programar una devolución de llamada asíncrona para que se ejecute en otro momento.</p>

<p className="p">Use an asynchronous API such as setTimeout to schedule an asynchronous callback to run in another turn.</p>
<h3>Item 68: Use Promises for Cleaner Asynchronous Logic</h3>
<p className="it">Una forma alternativa popular de estructurar API asíncronas es usar promesas (a veces conocidas como diferidos o futuros). Las API asíncronas que hemos discutido en este capítulo toman las devoluciones de llamada como argumentos:</p>

<p className="p">A popular alternative way to structure  asynchronous  APIs  is  to  use promises (sometimes known as deferreds or futures). The asynchronous APIs we’ve discussed in this chapter take callbacks as arguments:</p>
<pre><code>downloadAsync("file.txt", function(file) &#123; console.log("file: " + file);<br></br>
&#125;);</code></pre>
<p className="it">Por el contrario, una API basada en la promesa no toma devoluciones de llamada como argumentos; En su lugar, devuelve un objeto de promesa, que a su vez acepta devoluciones de llamada a través de su método then:</p>

<p className="p">By contrast, a promise-based API does not take callbacks as arguments; instead, it returns a promise object, which itself accepts callbacks via its then method:</p>
<pre><code>var p = downloadP("file.txt");<br></br>
<br></br>
p.then(function(file) &#123; console.log("file: " + file);<br></br>
&#125;);</code></pre>
<p className="it">Hasta ahora esto apenas parece diferente de la versión original. Pero el poder de las promesas está en su composición. La devolución de llamada pasada a continuación, se puede utilizar no sólo para causar efectos (en el ejemplo anterior, para imprimir en la consola), sino también para producir resultados. Al devolver un valor de la devolución de llamada, podemos construir una nueva promesa:</p>

<p className="p">So far this hardly looks any different from the original version. But the power of promises is in their composability. The callback passed to then can be used not only to cause effects (in the above example, to print out to the console), but also to produce results. By returning a value from the callback, we can construct a new promise:</p>
<pre><code>var fileP = downloadP("file.txt");<br></br>
<br></br>
var lengthP = fileP.then(function(file) &#123;<br></br>
return file.length;<br></br>
&#125;);<br></br>
<br></br>
<br></br>
lengthP.then(function(length) &#123; console.log("length: " + length);<br></br>
&#125;);</code></pre>
<p className="it">Una forma de pensar en una promesa es como un objeto que representa un valor final: envuelve una operación concurrente que puede que aún no se haya completado, pero finalmente producirá un valor de resultado. El método entonces nos permite tomar un objeto de promesa que representa un tipo de valor eventual y generar un nuevo objeto de promesa que representa otro tipo de valor eventual, cualquiera que sea el retorno de la devolución de llamada.</p>

<p className="p">One way to think about a promise is as an object that represents an eventual value—it wraps a concurrent operation that may not have completed yet, but will eventually produce a result value. The then method allows us to take one promise object that represents one type of eventual value and generate a new promise object that represents another type of eventual value—whatever we return from the callback.</p>
<p className="it">Esta capacidad de construir nuevas promesas a partir de las promesas existentes les da una gran flexibilidad, y permite algunos modismos simples pero muy poderosos. Por ejemplo, es relativamente fácil construir una utilidad para "unir" los resultados de múltiples promesas:</p>

<p className="p">This ability to construct new promises from existing promises gives them great flexibility, and enables some simple but very powerful idioms. For example, it’s relatively easy to construct a utility for “joining” the results of multiple promises:</p>
<pre><code>var filesP = join(downloadP("file1.txt"),<br></br>
downloadP("file2.txt"), downloadP("file3.txt"));<br></br>
<br></br>
filesP.then(function(files) &#123; console.log("file1: " + files[0]); console.log("file2: " +&#92;<br></br> files[1]); console.log("file3: " + files[2]);<br></br>
&#125;);</code></pre>
<p className="it">Las bibliotecas de promesas también suelen proporcionar una función de utilidad llamada cuando, que puede usarse de manera similar:</p>

<p className="p">Promise libraries also often provide a utility function called when, which can be used similarly:</p>
<pre><code>var fileP1 = downloadP("file1.txt"), fileP2 = downloadP("file2.txt"), fileP3 =&#92;<br></br> downloadP("file3.txt");<br></br>
<br></br>
when([fileP1, fileP2, fileP3], function(files) &#123; console.log("file1: " + files[0]);&#92;<br></br> console.log("file2: " + files[1]); console.log("file3: " + files[2]);<br></br>
&#125;);</code></pre>
<p className="it">Parte de lo que hace que las promesas sean un excelente nivel de abstracción es que comunican sus resultados devolviendo valores de sus métodos, o componiendo promesas a través de utilidades como join, en lugar de escribir a estructuras de datos compartidas a través de devoluciones de llamada simultáneas. Esto es inherentemente más seguro porque evita las razas de datos discutidas en el ítem 66. Incluso el programador más concienzudo puede cometer errores simples al guardar los resultados de operaciones asíncronas en variables compartidas o estructuras de datos:</p>

<p className="p">Part of what makes promises an excellent level of abstraction is that they communicate their results by returning values from their then methods, or by composing promises via utilities such as join, rather than by writing to shared data structures via concurrent callbacks. This is inherently safer because it avoids the data races discussed   in Item 66. Even the most conscientious programmer can make simple mistakes when saving the results of asynchronous operations in shared variables or data structures:</p>
<pre><code>var file1, file2;<br></br>
<br></br>
downloadAsync("file1.txt", function(file) &#123; file1 = file;<br></br>
&#125;);<br></br>
<br></br>
downloadAsync("file2.txt", function(file) &#123; file1 = file; // wrong variable<br></br>
&#125;);</code></pre>
<p className="it">Las promesas evitan este tipo de error porque el estilo de las promesas concisamente componiendo evita la modificación de datos compartidos.</p>

<p className="p">Promises avoid this kind of bug because the style of concisely composing promises avoids modifying shared data.</p>
<p className="it">Observe también que las cadenas secuenciales de la lógica asíncrona parecen en realidad secuenciales con promesas, en lugar de con los patrones de anidación difíciles de manejar que se muestran en el ítem 62. Además, el manejo de errores se propaga automáticamente a través de promesas. Cuando encadena una colección de operaciones asíncronas a través de promesas, puede proporcionar una devolución de llamada de error única para toda la secuencia, en lugar de pasar una devolución de llamada de error a cada paso como en el código del elemento 63.</p>

<p className="p">Notice also that sequential chains of asynchronous logic actually appear sequential with promises, rather than with the unwieldy nesting patterns demonstrated in Item 62. What’s more, error handling is automatically propagated through promises. When you chain a collection of asynchronous operations together through promises, you can provide a single error callback for the entire sequence, rather than passing an error callback to every step as in the code in Item 63.</p>
<p className="it">A pesar de esto, a veces es útil crear ciertos tipos de razas a propósito, y las promesas proporcionan un mecanismo elegante para hacer esto. Por ejemplo, es posible que una aplicación tenga que intentar descargar simultáneamente el mismo archivo desde varios servidores diferentes y tomar lo que se complete primero. La utilidad select (o choose) toma varias promesas y produce una promesa cuyo valor es cualquier resultado que esté disponible primero. En otras palabras, "compite" varias promesas entre sí.</p>

<p className="p">Despite this, it is sometimes useful to create certain kinds of races purposefully, and promises provide an elegant mechanism for doing this. For example, an application may need to try downloading the same file simultaneously from several different servers and take whichever one completes first. The select (or choose) utility takes several promises and produces a promise whose value is whichever result becomes available first. In other words, it “races” several promises against one another.</p>
<pre><code>var fileP = select(downloadP(1"http://example1.com/file.txt"),<br></br>
downloadP(2"http://example2.com/file.txt"), downloadP(3"http://example3.com/file.txt"));<br></br>
<br></br>
fileP.then(function(file) &#123; console.log("file: " + file);<br></br>
&#125;);</code></pre>
<p className="it">Otro uso de select es proporcionar tiempos de espera para abortar operaciones que tardan demasiado:</p>

<p className="p">Another use of select is to provide timeouts to abort operations that take too long:</p>
<pre><code>var fileP = select(downloadP("file.txt"), timeoutErrorP(2000));<br></br>
<br></br>
fileP.then(function(file) &#123; console.log("file: " + file);<br></br>
&#125;, function(error) &#123;<br></br>
console.log("I/O error or timeout: " + error);<br></br>
&#125;);</code></pre>
<p className="it">En ese último ejemplo, estamos demostrando el mecanismo para proporcionar devoluciones de error a una promesa como el segundo argumento para entonces.</p>

<p className="p">In that last example, we’re demonstrating the mechanism for providing error callbacks to a promise as the second argument to then.</p>


<h3>Things to Remember</h3>
<p className="it">Las promesas representan valores eventuales, es decir, cálculos concurrentes que eventualmente producen un resultado.</p>

<p className="p">Promises represent eventual values, that is, concurrent computations that eventually produce a result.</p>
<p className="it">Use promesas para componer diferentes operaciones concurrentes.</p>

<p className="p">Use promises to compose different concurrent operations.</p>
<p className="it">Utilice API de promesa para evitar carreras de datos.</p>

<p className="p">Use promise APIs to avoid data races.</p>
<p className="it">Use select (también conocido como choose) para situaciones donde se requiere una condición de carrera intencional.</p>

<p className="p">Use select (also known as choose) for situations where an intentional race condition is required.</p>
</div>
</div>
  </Layout>
)