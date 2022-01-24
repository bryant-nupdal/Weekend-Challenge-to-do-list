$(document).ready(function() {
    console.log('jquery is sourced in');
    $('#submit-button').on('click', addTask);
    refreshList();
    $('#data').on('click', '.delete-button', deleteTask);
    $('#data').on('click', '.complete-button', isComplete);
});

function addTask() {
    console.log('inside the adding fuction');
    const category = $('#categories').val();
    const task = $('#task').val();
    const dueDate = $('#due').val();

    $('#categories').val('');
    $('#task').val('');
    $('#due').val('');

    $.ajax({
        method: 'POST',
        url: '/list',
        data: { 
            categories: category,
            task: task,
            due: dueDate
        }
    }).then (() => {
        refreshList();
    }).catch((error) => {
        console.log('There was an error posting the new task:', error);
    });
}

function refreshList(){
    console.log('fetching tasks, BRB!');
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then((response) => {
        $('#data').empty();
        for (let task of response){
            let className = '';
            console.log('what is ', task.complete)
            if (task.complete === true){
                className = 'taskcompleted'
            }
            $('#data').append(`
            <tr class='${className}'>
                <td><button class="complete-button" data-taskid='${task.id}' data-iscomplete='${task.complete}'>✔</button></td>
                <td>${task.categories}</td>
                <td>${task.task}</td>
                <td>${moment(task.due).format('MMM Do YY')}</td>
                <td><button class="delete-button" data-listid='${task.id}'>❌</button></td>
            </tr>
            `)
        }
    }).catch(function(error) {
        console.log('there is an error in GET', error);
    })
}

function deleteTask(event){
    console.log('made it to the delete function');
    const button = $(event.target);
    const taskid = button.data('listid');
    console.log(taskid);
    $.ajax({
      method: 'DELETE',
      url: `/list/${taskid}`
    }).then((response) => {
      refreshList();
    }).catch((error) => {
      console.log('Error deleting book: ',error);
    })
}

function isComplete(event){
    console.log('you made it to the complete function');
        
    const button = $(event.target);
    const taskid = button.data('taskid');
    let complete = button.data('iscomplete');
    console.log(`${complete}`);
      
        $.ajax({
          method: 'PUT', 
          url: `/list/${taskid}`,
          data: {
            complete: `${complete}`
          }
        }).then (() => {
          refreshList();
        }).catch(error => {
          console.log('error updating', error);
    })
}

