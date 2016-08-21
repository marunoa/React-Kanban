const CardForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      priority: "",
      status: "",
      createdBy: "",
      assignedTo: ""
    };
  },

  handleTitleChange: function (val) {
    this.setState({title: val.target.value});
  },

  handlePriorityChange: function (val) {
    this.setState({priority: val.target.value});
  },

  handleStatusChange: function (val) {
    this.setState({status: val.target.value});
  },

  handleCreatedByChange: function (val) {
    this.setState({createdBy: val.target.value});
  },

  handleAssignedToChange: function (val) {
    this.setState({assignedTo: val.target.value})
  },

  handleSubmit: function (val) {
    console.log("inside handle submit", val);

    let title = this.state.title.trim();
    let priority = this.state.priority.trim();
    let status = this.state.status.trim();
    let createdBy = this.state.createdBy.trim();
    let assignedTo = this.state.assignedTo.trim();

    if (!title || !priority || !status || !createdBy || !assignedTo) {
      return;
    }

    this.setState({
      title: "",
      priority: "",
      status: "",
      createdBy: "",
      assignedTo: ""
    });
  },

  render: function () {
    return (
      <form className="cardForm" onSubmit={this.handleSubmit}>
        <input type="text"
              placeholder="Enter a title"
              onChange={this.handleTitleChange}
        />
        <input type="number"
              placeholder="Priority level"
              onChange={this.handlePriorityChange}
        />
        <input type="text"
              placeholder="In Queue, In Progress or Done"
              onChange={this.handleStatusChange}
        />
        <input type="text"
              placeholder="Created By"
              onChange={this.handleCreatedByChange}
        />
        <input type="text"
              placeholder="Assigned To"
              onChange={this.handleAssignedToChange}
        />
        <input type="submit"
              value="Create"
        />
      </form>
    );
  }
});

const CardList = React.createClass({
  render: function () {
    var cards = this.props.data.map(function (card, index) {
      return (
        <CardForm
          key={index}
          title={card.title}
        >
          {card.priority}
        </CardForm>
      );
    }).reverse();
    return (
      <div className="cardList">
        {cards}
      </div>
    );
  }
});

const KanbanBoard = React.createClass({
  loadCardsFromServer: function () {
    $.ajax({
      url: this.props.url,
      cache: false,
      success: function (data) {
        console.log("inside ajax", data);
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCardSubmit: function (form) {
    $.ajax({
      url: this.props.url,
      type: "POST",
      data: form,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function (data) {
    return {data: []};
  },

  componentDidMount: function () {
    this.loadCardsFromServer();
  },

  render: function () {
    return (
      <div className="kanbanBoard">
        <div className="column">In Queue
          <CardList data={this.state.data}/>
        </div>
        <div className="column">In Progress
          <CardList data={this.state.data}/>
        </div>
        <div className="column">Done
          <CardList data={this.state.data}/>
        </div>
          <CardForm data={this.state.data} onCardSubmit={this.handleCardSubmit}/>
      </div>
    );
  }
});

ReactDOM.render(
  <KanbanBoard url="/api/cards" />,
  document.getElementById("app")
);

/*let cardsList = [
  {
    id: 1,
    title: "JUST DO IT",
    priority: "low",
    status: "todo",
    createdBy: "Moi",
    assignedTo: "Moi"
  },
  {
    id: 2,
    title: "DONT DO IT",
    priority: "high",
    status: "todo",
    createdBy: "VA",
    assignedTo: "VA"
  }
];

const Card = React.createClass({
  render: function () {
    return (
      <div className="card">
        <div className="card_title">{this.props.title}</div>
      </div>
    );
  }
});

const List = React.createClass({
  render: function () {
    var cards = this.props.cards.map((card) => {
      return <Card  id={card.id}
                    title={card.title}
                    priority={card.priority}
                    status={card.status}
                    createdBy={card.createdBy}
                    assignedTo={card.assignedTo} />
    });
    return(
      <div className="list">
        <h1>{this.props.title}</h1>
          {cards}
      </div>
    );
  }
});

const KanbanBoard = React.createClass({
  render: function () {
    return (
      <div className="kanbanBoard">
        <List id="todo" title="To Do" cards={
          this.props.cards.filter((card) => card.status === "todo")
        } />

        <List id="in-progress" title="In Progress" cards={
          this.props.cards.filter((card) => card.status === "in-progress")
        } />

        <List id="done" title="Done" cards={
          this.props.cards.filter((card) => card.status === "done")
        } />
      </div>
    );
  }
});

ReactDOM.render(<KanbanBoard cards={cardsList} />,
  document.getElementById("app")
);*/