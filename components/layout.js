import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'This is the default title' }) => (
  <div>
  <style jsx>{`.link1 {font-family: Verdana; background-color: #CEDDF1; color: #2D0D0D; font-size: 20px;}`}</style>

    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/Preface'><a className="link1">Preface</a></Link> |  
        <Link href='/Chapter1'><a className="link1">Chapter 1</a></Link> |  
        <Link href='/Chapter2'><a className="link1">Chapter 2</a></Link> |  
        <Link href='/Chapter3'><a className="link1">Chapter 3</a></Link> |  
        <Link href='/Chapter4'><a className="link1">Chapter 4</a></Link> |  
        <Link href='/Chapter5'><a className="link1">Chapter 5</a></Link> |  
        <Link href='/Chapter6'><a className="link1">Chapter 6</a></Link> |  
        <Link href='/Chapter7'><a className="link1">Chapter 7</a></Link>
      </nav>
    </header>

    { children }

    <footer>
      <nav>
        <Link href='/Preface'><a className="link1">Preface</a></Link> |  
        <Link href='/Chapter1'><a className="link1">Chapter 1</a></Link> |  
        <Link href='/Chapter2'><a className="link1">Chapter 2</a></Link> |  
        <Link href='/Chapter3'><a className="link1">Chapter 3</a></Link> |  
        <Link href='/Chapter4'><a className="link1">Chapter 4</a></Link> |  
        <Link href='/Chapter5'><a className="link1">Chapter 5</a></Link> |  
        <Link href='/Chapter6'><a className="link1">Chapter 6</a></Link> |  
        <Link href='/Chapter7'><a className="link1">Chapter 7</a></Link>
      </nav>
    </footer>
  </div>
)
