// Load RSS feed

$('#categories').append(`
    <a onclick="load_rss()" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
    دریافت اطلاعات از سرور‌های دیگر
    <span class="badge badge-primary badge-pill ml-auto">` + 10 + `</span>
    </a>
`);


function load_rss() {
    
}

// Load categories

$.get("data/categories.json" , function(data, status){
    data.forEach(obj => {
        $('#categories').append(`
            <a onclick="load_cat(` + obj['id'] + `)" class="list-group-item list-group-item-action">` + obj['title'] + `</a>
        `);
    });
});

function load_cat(id) {
    $.get("data/category_" + id + ".json" , function(data, status){
        $("#items").html('');
        data.forEach(obj => {
            $('#items').append(`
            <tr>
                <th scope="row">` + obj['index'] + `</th>
                <td>
                <a href="#">
                ` + obj['content'] + `
                </a>
                </td>
                <td>
                <a class="btn btn-sm btn-danger my-1 my-sm-0">
                    <span class="fas fa-zoom mr-1"></span>
                    دریافت اطلاعات</a>
                </td>
            </tr>
          `);
        });
    });
}