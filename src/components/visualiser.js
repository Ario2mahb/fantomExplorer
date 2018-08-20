import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import * as d3 from 'd3'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 24
  },
  paperHeading: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    minHeight: 80
  },
  legendText: {
    display: 'inline-block',
    minHeight: 30,
    lineHeight: '30px'
  },
  circleEvent: {
    height: 30,
    width: 30,
    backgroundColor: '#039be5',
    borderRadius: '50%',
    display: 'inline-block'
  },
  circleNode: {
    height: 30,
    width: 30,
    backgroundColor: 'black',
    borderRadius: '50%',
    display: 'inline-block'
  },
  circleWitness: {
    height: 30,
    width: 30,
    backgroundColor: 'orange',
    borderRadius: '50%',
    display: 'inline-block'
  },
  circleFamous: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
    borderRadius: '50%',
    display: 'inline-block'
  },
  lineLink: {
    borderBottom: '1px solid black',
    width: 40,
    paddingTop: 20
  },
  lineRound: {
    borderBottom: '2px solid yellow',
    width: 40,
    paddingTop: 20
  }
});

class Visualiser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 2000,
      events: [],
      links: [],
      nodes: [],
      rounds: []
    };

    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentDidMount() {
    this.generateGraph()
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.paperHeading}>
              <Typography variant="display1">
                Visualisation of Lachesis Protocol
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <svg width={'100%'} height={this.state.svgHeight}></svg>
            </Paper>
          </Grid>
          <Grid item xs={12} align="left">
            <Paper className={classes.paper}>
              <Grid container spacing={8}>
                <Grid item xs={2} md={1}>
                  <div className={classes.circleNode}></div>
                </Grid>
                <Grid item xs={10} md={5}>
                  <Typography className={classes.legendText}>Node</Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                  <div className={classes.circleEvent}></div>
                </Grid>
                <Grid item xs={10} md={5}>
                  <Typography className={classes.legendText}>Event</Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                  <div className={classes.circleWitness}></div>
                </Grid>
                <Grid item xs={10} md={5}>
                  <Typography className={classes.legendText}>Witness Event</Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                  <div className={classes.circleFamous}></div>
                </Grid>
                <Grid item xs={10} md={5}>
                  <Typography className={classes.legendText}>Famous Event</Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                  <div className={classes.lineLink}></div>
                </Grid>
                <Grid item xs={10} md={5}>
                  <Typography className={classes.legendText}>Link to Parent Event</Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                  <div className={classes.lineRound}></div>
                </Grid>
                <Grid item xs={10} md={5}>
                  <Typography className={classes.legendText}>Round Completed</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  };

  drawPoints(svg, nodeSerperation, eventSeperation, svgWidth) {
    let nodes = []
    let nodeX = 30
    let nodeY = 30

    let events = []
    let eventX = 80;
    let eventY = 0;

    let links = []

    let rounds = []
    let maxX = 0

    let blocks = []
    let blockX = 0
    let blocky = 0

    this.props.consensusEventsData.map((consensusEvent) => {

      //GET NODES
      let existingNode = nodes.filter((node) => {
        return node.id == consensusEvent.payload.Body.Creator
      })

      if(existingNode.length == 0) {
        let node = {
          id: consensusEvent.payload.Body.Creator,
          x: nodeX,
          y: nodeY
        }
        nodes.push(node)
        nodeY = nodeY + nodeSerperation
      }

      //GET EVENTS
      eventY = nodes.filter((node) => {
        return node.id == consensusEvent.payload.Body.Creator
      })[0].y

      let event = {
        id: consensusEvent.hash,
        x: eventX,
        y: eventY
      }
      events.push(event)
      eventX = eventX + eventSeperation

      //GET LINKS
      consensusEvent.payload.Body.Parents.map((parent) => {
        let parentEvents = events.filter((event) => {
          return event.id == parent
        })

        if(parentEvents.length > 0) {
          let parentEvent = parentEvents[0]

          let event = events.filter((event) => {
            return event.id == consensusEvent.hash
          })[0]

          let link = {
            id: 'link_'+consensusEvent.hash+'_'+parentEvent.id,
            x1: event.x,
            y1: event.y,
            x2: parentEvent.x,
            y2: parentEvent.y
          }

          links.push(link)
        }
      })
    })

    let svgHeight = ((nodes.length-1) * nodeSerperation) + 60
    this.setState({ svgHeight })

    //GET ROUNDS
    this.props.roundsData.map((roundData) => {
      for (var key in roundData.payload.Events) {
        if (roundData.payload.Events.hasOwnProperty(key)) {
          let event = events.filter((event) => {
            return key == event.id
          })[0]

          if(event) {
            maxX = event.x > maxX ? event.x : maxX
          }

          events = events.map((event) => {
            if(roundData.payload.Events[key].Famous == 1 && event.id == key) {
              event.famous = true
            }
            if(roundData.payload.Events[key].Witness == true && event.id == key) {
              event.witness = true
            }
            return event
          })
        }
      }

      rounds.push({
        x: maxX+(eventSeperation/2)
      })
    })

    //GET BLOCKS
    // for(let i = 0; i < blocksData.length; i++) {
    //
    // }

    nodes.map((node) => {
      this.createNode(svg, node.x, node.y, svgWidth-20);
    })

    links.map((link) => {
      this.createLink(svg, link.x1, link.y1, link.x2, link.y2, link.id);
    })

    events.map((event) => {
      this.createEvent(svg, event.x, event.y, event.famous, event.witness, event.id, this.handleMouseOver, this.handleMouseOut);
    })

    rounds.map((round) => {
      this.createRound(svg, round.x, 0, (nodes.length-1)*nodeSerperation + 60);
    })

    blocks.map((block) => {
      this.createBlock(svg, block.x, block.y);
    })

    this.setState({
      nodes,
      links,
      events,
      rounds,
      blocks
    })
  }

  zoomed(zoomLayer) {
    zoomLayer.attr("transform", d3.event.transform);
  }

  generateGraph() {

    if(this.props.consensusEventsData == null || this.props.consensusEventsData.length == 0) {
      return null;
    }

    let nodeSerperation = 120
    let eventSeperation = 60

    let svgWidth = (this.props.consensusEventsData.length * eventSeperation) + 120

    this.setState({ svgWidth })

    var svg = d3.select("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
      }))
      .append("g")

    this.drawPoints(svg, nodeSerperation, eventSeperation, svgWidth)
  };

  createNode(svgContainer, x, y, width){
    let radius = 20

    let node = svgContainer.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", radius);

    let line = svgContainer.append("line")
      .attr("x1", x+radius)
      .attr("y1", y)
      .attr("x2", width)
      .attr("y2", y)
      .attr("stroke-width", 0.5)
      .attr("stroke", "white");
  };

  createEvent(svgContainer, x, y, famous, witness, id, handleMouseOver, handleMouseOut) {
    let radius = 15

    let event = svgContainer.append("circle")
      .attr("id", id)
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", radius)
      .style("fill", famous===true ? "red" : witness===true ? "orange" : "#039be5")

      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
  };

  createLink(svgContainer, x1, y1, x2, y2, id) {
    let line = svgContainer.append("line")
      .attr("id", id)
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("stroke-width", 1.5)
      .attr("stroke", "black");
  };

  createBlock(svgContainer, x, y) {
    let size = 30

    let block = svgContainer.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", size)
      .attr("height", size)
      .style("fill", "green");;
  };

  createRound(svgContainer, x, y1, y2) {
    let line = svgContainer.append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", y1)
      .attr("y2", y2)
      .attr("stroke-width", 3)
      .attr("stroke", "yellow");
  };

  handleMouseOver(d, index, target) {
    d3.selectAll('circle')
      .style("opacity", 0.2)

    d3.select(target[0])
      .attr("r", 20)
      .style("opacity", 1);

    if(this.state) {
      this.state.links.map((link) => {
        if(link.id.includes(target[0].id)) {
          d3.select("#"+link.id)
            .style("opacity", 1)
            .attr("stroke", "#039be5");
        } else {
          d3.select("#"+link.id)
            .style("opacity", 0.2)
        }
      })
    }
  };

  handleMouseOut(d, index, target) {
    d3.selectAll('circle')
      .style("opacity", 1)

    d3.select(target[0])
      .attr("r", 15)

    if(this.state) {
      this.state.links.map((link) => {
        d3.select("#"+link.id)
          .style("opacity", 1)
          .attr("stroke", "black");
      })
    }
  };
}

Visualiser.propTypes = {
  classes: PropTypes.object.isRequired,
  roundsData: PropTypes.array.isRequired,
  blocksData: PropTypes.array.isRequired,
  consensusEventsData: PropTypes.array.isRequired
};

export default withStyles(styles)(Visualiser);
