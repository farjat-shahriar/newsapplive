import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {


  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
 
  constructor() {
    super();
    this.state = {
      articles:[],
      loading: false,
      page: 1,
      totalResults:0
    }
  }

  async Update(){
    const url=`https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=cb98bad807c544f089ba7368a8e97a6c&page=${this.state.page}&${this.props.pageSize}`;
    this.setState({loading:true})
    let data =await fetch(url)
    let parsedata = await data.json()
    // console.log(parsedata)
    this.setState ({articles: parsedata.articles, 
      totalResults:parsedata.totalResults,
      loading: false
    })
  }
  async componentDidMount(){
    // let url=`https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=cb98bad807c544f089ba7368a8e97a6c&page=1&${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data =await fetch(url)
    // let parsedata = await data.json()
    // // console.log(parsedata)
    // this.setState ({articles: parsedata.articles, 
    //   totalResults:parsedata.totalResults,
    //   loading: false
    // })
    this.Update()
  }
  handelprev=async()=>{
    // console.log("previous")
    // let url= `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=cb98bad807c544f089ba7368a8e97a6c&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data =await fetch(url)
    // let parsedata = await data.json()
    // console.log(parsedata)
    // this.setState ({
    //   page: this.state.page -1,
    //   articles: parsedata.articles,
    //   loading:false
    // })
    this.setState ({
      page: this.state.page -1,
    })
    this.Update()

  }

  handelnext= async()=>{
    // if(!(this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url= `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=cb98bad807c544f089ba7368a8e97a6c&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data =await fetch(url)
    // let parsedata = await data.json()
    // // console.log(parsedata)
    // this.setState ({
    //   page: this.state.page +1,
    //   articles: parsedata.articles,
    //   loading:false
    // })
    this.setState ({
      page: this.state.page +1,
    })
    this.Update()

  }

  fetchMoreData = async () => { 
    this.setState ({
      page: this.state.page +1,
    })
    const url=`https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=cb98bad807c544f089ba7368a8e97a6c&page=${this.state.page}&${this.props.pageSize}`;
    this.setState({loading:true})
    let data =await fetch(url)
    let parsedata = await data.json()
    // console.log(parsedata)
    this.setState ({articles:this.state.articles.concat(parsedata.articles),
      totalResults:parsedata.totalResults,
      loading: false
    })
    
  };
  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center my-3'>This is my news App</h2>
       {/* {  this.state.loading&&< Spinner/>} */}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        
          {this.state.articles.map((element)=>{
         return <div className="col-md-4" key={element.url}>
           <Newsitem title={element.title} description={element.description} imgurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

          </div>})}
          
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-dark" onClick={this.handelprev}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handelnext}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}
