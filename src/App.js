import React, { Component } from "react";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      blockOneHeight: 100,
      blockOneWidth: 100,
      yOfBlockOne: 0,
      xOfBlockOne: 0,
      blockColor: "Red",
      xOfBigBlock: 400,
      yOfBigBlock: 200,
      moveSmallBlock: false,
      moveBigBlock: false,
      isInside : false
    };
    this.handleResize = this.handleResize.bind(this);
    this.triggerMove = this.triggerMove.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.triggerMoveBig = this.triggerMoveBig.bind(this);
    // this.changeColor = this.changeColor.bind(this);
    // this.changeColorInner = this.changeColorInner.bind(this);
    // this.changeColorInnerOut = this.changeColorInnerOut.bind(this);
    // this.changeColorOuterOut = this.changeColorOuterOut.bind(this);
    // this.ifOverlapping = this.ifOverlapping.bind(this);
    // this.ifIntersectingFirstWidth = this.ifIntersectingFirstWidth.bind(this);
  }
  handleResize() {
    var blockOne = document.getElementById("blockOne");
    if(this.state.isInside){

    }
      this.setState({
        blockOneHeight: parseInt(blockOne.style.height, 10),
        blockOneWidth: parseInt(blockOne.style.width, 10),
        moveSmallBlock: false,
        moveBigBlock: false
      });
    // }
  }
  triggerMove(event){
    this.setState({
      moveSmallBlock: true,
    });
  }
  triggerMoveBig() {
    this.setState({
      moveBigBlock: true
    });
  }
  handleMove(event) {
    this.ifIntersectingHeight();
    // this.ifIntersectingSecondWidth();
    this.ifIntersectingWidth();
    this.ifOverlapping();
    this.changeColor();
    this.changeColorInner();
    this.changeColorInnerOut();
    this.changeColorOuterOut();
    // var blockOne = document.getElementById("blockOne");
    // const rect = blockOne.getBoundingClientRect();
    // var topInsideBox = this.state.yOfBlockOne - this.state.yOfBigBlock;
    // var leftInsideBox = this.state.xOfBlockOne - this.state.xOfBigBlock;
    
    if (this.state.moveSmallBlock) {
      this.setState({
        xOfBlockOne: event.clientX,
        yOfBlockOne: event.clientY 
      });
    } else if (this.state.moveBigBlock) {
      this.setState({
        xOfBigBlock: event.clientX,
        yOfBigBlock: event.clientY
      });
    }
  }
  changeColor(){
    if(this.state.xOfBlockOne > this.state.xOfBigBlock && this.state.yOfBlockOne > this.state.yOfBigBlock){
      this.setState({
        blockColor : 'darkorange',
        isInside : true
      })     
    } else {
      this.setState({
        blockColor : 'red',
        isInside : false
      })
    }
  }
  changeColorInner(){
    var xOfInnerBlock = this.state.xOfBigBlock + this.state.blockOneWidth + 30;;
    var yOfInnerBlock = this.state.yOfBigBlock + this.state.blockOneHeight + 30;
    if(this.state.xOfBlockOne > xOfInnerBlock && this.state.yOfBlockOne > yOfInnerBlock){
      this.setState({
        blockColor : 'purple'
      })
    }
  }
  changeColorInnerOut(){
    var xOfInnerBlock = this.state.xOfBigBlock + this.state.blockOneWidth + 30 + 30 + this.state.blockOneWidth;
    var yOfInnerBlock = this.state.yOfBigBlock + this.state.blockOneHeight + 30 + 30 + this.state.blockOneHeight;
    // console.log(xOfInnerBlock, yOfInnerBlock);
    
    if(this.state.xOfBlockOne > xOfInnerBlock || this.state.yOfBlockOne > yOfInnerBlock){
      this.setState({
        blockColor : 'darkorange',
        isInside : true
      })
    }
  }
  changeColorOuterOut(){
    // var bigBlockHeight = this.state.blockOneHeight + 30;
    // var bigBlockWidth = this.state.blockOneWidth + 30;
    var outerPointX = (this.state.blockOneWidth * 3) + 90 + this.state.xOfBigBlock;
    var outerPointY = (this.state.blockOneHeight * 3) + 90 + this.state.yOfBigBlock;
    // console.log(outerPointX , outerPointY);
    if(this.state.xOfBlockOne > outerPointX || this.state.yOfBlockOne > outerPointY || this.state.xOfBlockOne < this.state.xOfBigBlock || this.state.yOfBlockOne < this.state.yOfBigBlock){
      this.setState({
        blockColor : 'Red',
        isInside : false
      })
    }
  }
  ifOverlapping(){
    var outerPointX = (this.state.blockOneWidth * 3) + 90 + this.state.xOfBigBlock;
    var outerPointY = (this.state.blockOneHeight * 3) + 90 + this.state.yOfBigBlock;
    const smallBlockOneWidth = this.state.xOfBlockOne + this.state.blockOneWidth;
    const smallBlockOneHeight = this.state.yOfBlockOne + this.state.blockOneHeight;
    if(this.state.moveBigBlock){
      if (this.state.xOfBigBlock === smallBlockOneWidth || this.state.yOfBigBlock === smallBlockOneHeight) {
        this.setState({
          xOfBlockOne : outerPointX + 100,
          yOfBlockOne : outerPointY + 100
        })
      } else if(outerPointX === this.state.xOfBlockOne || outerPointY === this.state.yOfBlockOne){
        this.setState({
          xOfBlockOne : this.state.xOfBigBlock - (this.state.blockOneWidth + 100),
          yOfBlockOne : this.state.yOfBigBlock - (this.state.blockOneHeight + 100)
        })
      }
    }
  }
  ifIntersectingWidth(){
    var outWidth = this.state.xOfBigBlock - this.state.xOfBlockOne;
    var inWidth = (this.state.xOfBlockOne + this.state.blockOneWidth) - this.state.xOfBigBlock;
    var outWidthSecond = (this.state.xOfBlockOne + this.state.blockOneWidth) - (this.state.xOfBigBlock + ((this.state.blockOneWidth * 3) + 90));
    var inWidthSecond = (this.state.xOfBigBlock + ((this.state.blockOneWidth * 3) + 90)) - this.state.xOfBlockOne;
    if(this.state.yOfBlockOne+this.state.blockOneHeight > this.state.yOfBigBlock && this.state.yOfBlockOne < (this.state.yOfBigBlock + (this.state.blockOneHeight * 3)+ 90)){
      // console.log('Level 1');
        if(this.state.xOfBlockOne < this.state.xOfBigBlock && (this.state.xOfBlockOne + this.state.blockOneWidth) > this.state.xOfBigBlock){
          if(outWidth > inWidth){
          this.setState({
            xOfBlockOne : (this.state.xOfBlockOne - inWidth) - 20,
            yOfBlockOne : this.state.yOfBlockOne
          })
        } else if(inWidth > outWidth){
          this.setState({
            xOfBlockOne : this.state.xOfBigBlock + 20,
            yOfBlockOne : this.state.yOfBlockOne
          })
        }
      } else if((this.state.xOfBlockOne < (this.state.xOfBigBlock + ((this.state.blockOneWidth * 3) + 90)) && (this.state.xOfBigBlock + ((this.state.blockOneWidth * 3) + 90)) < (this.state.xOfBlockOne + this.state.blockOneWidth))){
        if(outWidthSecond < inWidthSecond){
          // console.log('Inside ');
          this.setState({
            xOfBlockOne : (this.state.xOfBigBlock + ((this.state.blockOneWidth * 3) + 90)) - this.state.blockOneWidth - 20,
            yOfBlockOne : this.state.yOfBlockOne
          })
        } else if(inWidthSecond < outWidthSecond){
          // console.log('Outside');
          this.setState({
            xOfBlockOne : this.state.xOfBigBlock + ((this.state.blockOneWidth * 3) + 90) + 20,
            yOfBlockOne : this.state.yOfBlockOne
          })
        }
      }
    }
  }
  ifIntersectingHeight(){
    var outHeight = this.state.yOfBigBlock - this.state.yOfBlockOne;
    var inHeight = (this.state.yOfBlockOne + this.state.blockOneHeight) - this.state.yOfBigBlock;
    var inHeightBottom = (this.state.yOfBigBlock + (this.state.blockOneHeight * 3) + 90) - this.state.yOfBlockOne;
    var outHeightBottom = (this.state.yOfBlockOne + this.state.blockOneHeight) - (this.state.yOfBigBlock + (this.state.blockOneHeight * 3) + 90);
    if((this.state.xOfBlockOne+this.state.blockOneWidth) > this.state.xOfBigBlock && this.state.xOfBlockOne < (this.state.xOfBigBlock+((this.state.blockOneWidth * 3) + 90))){
      // console.log('Workiong');
      if(this.state.yOfBlockOne < this.state.yOfBigBlock && (this.state.yOfBlockOne + this.state.blockOneHeight) > this.state.yOfBigBlock){
        // console.log('Inside');
        if(outHeight > inHeight){
          this.setState({
            yOfBlockOne : (this.state.yOfBlockOne - inHeight) - 20,
            xOfBlockOne : this.state.xOfBlockOne
          })
        } else if(inHeight > outHeight){
          this.setState({
            yOfBlockOne : this.state.yOfBlockOne + 20,
            xOfBlockOne : this.state.xOfBlockOne
          })
        }
      }
      else if(this.state.yOfBlockOne < (this.state.yOfBigBlock + (this.state.blockOneHeight * 3) + 90) && (this.state.yOfBlockOne + this.state.blockOneHeight) > (this.state.yOfBigBlock + (this.state.blockOneHeight * 3) + 90)){
        if(inHeightBottom > outHeightBottom){
          // console.log('In Height');
          this.setState({
            yOfBlockOne : this.state.yOfBlockOne - outHeightBottom - 20,
            xOfBlockOne : this.state.xOfBlockOne
          })
        } else if(inHeightBottom < outHeightBottom){
          // console.log('Out Height');
          this.setState({
            yOfBlockOne : this.state.yOfBlockOne + 20,
            xOfBlockOne : this.state.xOfBlockOne
          })
        }
      }
    }
  }
  render() {
    var bigBlockHeight = this.state.blockOneHeight + 30;
    var bigBlockWidth = this.state.blockOneWidth + 30;
    // var xOfInnerBlock = this.state.xOfBigBlock + bigBlockWidth;
    // var yOfInnerBlock = this.state.yOfBigBlock + bigBlockHeight;
    // console.log(xOfInnerBlock , yOfInnerBlock);
    return (
      <div
        style={{
          height: `100vh`,
          width: `100%`,
          // border: `1px solid black`,
          margin: `auto`
        }}
        onMouseUp={this.handleResize}
        onMouseMove={this.handleMove}
      >
        <div
          id="blockOne"
          style={{
            height: `${this.state.blockOneHeight}px`,
            width: `${this.state.blockOneWidth}px`,
            marginTop: `${this.state.yOfBlockOne}px`,
            marginLeft: `${this.state.xOfBlockOne}px`,
            background: `${this.state.blockColor}`,
            position: "absolute",
            resize: `both`,
            overflow: `auto`,
            zIndex: 11,
            boxShadow: '15px 15px 10px 0px rgba(0,0,0,0.75)'
          }}
          onDoubleClick={this.triggerMove}
        >
          {/* {this.state.xOfBlockOne} - {this.state.yOfBlockOne} <br></br>
          {this.state.blockOneHeight} x {this.state.blockOneWidth} <br></br> */}
        </div>
        <div
          style={{
            position: `absolute`,
            background: `pink`,
            // resize: `both`,
            // overflow: `auto`,
            marginTop: `${this.state.yOfBigBlock}px`,
            marginLeft: `${this.state.xOfBigBlock}px`,
            height: `${bigBlockHeight}px`,
            width: `${bigBlockWidth}px`,
            borderTop: `${bigBlockHeight}px solid yellow`,
            borderBottom: `${bigBlockHeight}px solid yellow`,
            borderLeft: `${bigBlockWidth}px solid yellow`,
            borderRight: `${bigBlockWidth}px solid yellow`,
            boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'
          }}
          onDoubleClick={this.triggerMoveBig}
      >
          {/* {this.state.xOfBigBlock} - {this.state.yOfBigBlock} */}
        </div>
      </div>
    );
  }
}