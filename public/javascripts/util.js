var ip = "http://localhost:3000";

const NO_RESULT = "There's no result from the server";

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const PUT_METHOD = 'PUT';
const DELETE_METHOD = 'DELETE';

const NORMAL_STATUS = 9200;
const LOADING = "Loading...";

function restGet(restUrl, httpMethod, callback, resultDiv) {
  rest(restUrl, httpMethod, "", "application/json", "json", callback, resultDiv);
}

function restSet(restUrl, httpMethod, entity, callback, resultDiv) {
  rest(restUrl, httpMethod, entity, "application/json", "json", callback,
    resultDiv);
}

function rest(restUrl, httpMethod, entity, contentType, dataType, callback,
  resultDiv) {
  var resultLine = jQuery(resultDiv);
  resultLine.html(LOADING);
  var request = jQuery.ajax({
    type: httpMethod,
    url: restUrl,
    data: entity,
    contentType: contentType,
    dataType: dataType
  });
  request.done(function(data) {
    try {
      if (data === null || data === undefined) {
        resultLine.html(NO_RESULT);
      } else if (data.statusCode && data.statusCode != NORMAL_STATUS) {
        resultLine.html("Error:" + data.errorInfo);
      } else if (callback != null) {
        resultLine.html("");
        callback(data);
      }
    } catch (e) {
      resultLine.html(e);
    }
  });
  request.fail(function(textStatus, errorThrown) {
    resultLine.html(errorThrown + " status=" + textStatus.status + " text=" +
      textStatus.statusText);
  });
  resultLine.append(" DONE!");
}
