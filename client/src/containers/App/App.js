import Header from '../../components/MainSections/Header/Header';
import ContentSection from '../../components/MainSections/ContentSection/ContentSection';
import Footer from '../../components/MainSections/Footer/Footer'
import ArticleProvider from '../../articleContext/ArticleContext';

function App() {

  return (
    <>
      <ArticleProvider>
        <Header />
        <ContentSection />
        <Footer />
      </ArticleProvider>
    </>
  ) 
}

export default App;
