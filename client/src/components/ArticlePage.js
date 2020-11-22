import React from 'react';
import Footer from './Footer';
import SearchBar from './SearchBar';

export default function ArticlePage(props) {
  return (
    <>
      <div className="header">
        <SearchBar/>
      </div>
      <div className="article-page">
        <div className="banner" style={{backgroundImage: `url(${props.banner})`}}>
          <div className="title">
            <h1>
              {props.title}
            </h1>
          </div>
        </div>
        <div className="body-wrap">
          <div className="article-body">
            <p>
              <span>Lorem</span> ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper aliquet tempus. Maecenas sed varius lacus. Etiam tincidunt in felis ut faucibus. Duis ornare diam quis finibus imperdiet. Curabitur non sapien ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin sodales tincidunt lacinia. In nunc mauris, pulvinar sit amet rhoncus non, imperdiet vel felis. Aliquam gravida elementum magna eget sollicitudin. Etiam consectetur vestibulum libero, in tempus enim convallis vel. Suspendisse cursus erat vitae dui aliquet, sed feugiat nibh maximus. Donec finibus urna eget ex accumsan, pulvinar egestas sapien egestas. Sed fringilla, diam ac ultrices placerat, est odio mattis ante, nec dapibus nulla tortor et felis. Fusce a arcu vel elit feugiat faucibus.<br/>
            </p>
            <p>
              Suspendisse potenti. Praesent eget mi pharetra, sollicitudin erat et, venenatis ex. Sed sed nibh vitae urna dignissim feugiat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut in quam a lectus feugiat porta. Integer imperdiet elit at cursus gravida. Nunc eleifend ex in turpis vehicula rutrum. Phasellus dapibus at massa at vestibulum. Nulla faucibus risus sem, vitae egestas arcu ultrices ut. Nulla eu nisl sit amet risus interdum blandit non lobortis massa. Donec at neque molestie ligula semper pretium. Cras ut libero sit amet odio tristique efficitur a condimentum ex. Donec ultrices felis eu ante pellentesque consequat. Cras lobortis elit fermentum leo feugiat, eu gravida massa semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>
            </p>
            <p>
              Pellentesque egestas tellus erat, rhoncus lobortis nulla condimentum in. Etiam feugiat tempus felis, vel gravida mi euismod ac. Aenean maximus sem massa, quis aliquet nunc dapibus consequat. Donec mauris diam, euismod vel efficitur quis, ultrices nec sem. Sed elementum placerat dui, sodales egestas magna aliquam nec. Suspendisse convallis ex et ex sollicitudin semper. Curabitur fermentum aliquet est a imperdiet. Curabitur at metus neque.<br/>
            </p>
            <p>
              Aliquam consequat eu ante id eleifend. Proin rhoncus auctor lorem sed rhoncus. Nulla sed orci tempor, tincidunt est ut, lacinia massa. Donec dignissim malesuada pretium. Vestibulum vel mollis nisl, ac semper enim. Sed et ultricies ex. In a nisi leo. Aenean ultricies porttitor dolor quis suscipit. Nunc dapibus sapien congue lacus mattis finibus. In hac habitasse platea dictumst. Aenean rhoncus tempor lectus vel lacinia. In vitae nibh gravida sem lobortis varius a a justo. Suspendisse augue nunc, mattis non dignissim eget, tristique eu ligula. Donec volutpat viverra nisi at varius.<br/>
            </p>
            <p>
              Integer nibh lacus, semper bibendum nisl ut, congue euismod nisi. Vivamus viverra id magna vel rhoncus. Maecenas metus erat, consectetur at iaculis sit amet, cursus ut dolor. Duis a venenatis ipsum, condimentum pretium libero. Aenean id nunc massa. Sed nec mattis est. Proin convallis auctor pretium. Duis vulputate pretium nisi, in congue lacus iaculis a. Donec et lorem ac metus maximus aliquam a in ante. In non convallis eros.<br/>
            </p>
          </div>
          <div className="author-info">
            by <span>{props.author}</span>
          </div>
        <div className="ad-no-repeat">
        </div>
        </div>
      </div>
      <Footer/>      
    </>
  )
}
