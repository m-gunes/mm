var eventJs = (function() {

    function init() {
        bindEvents();
    }

    function bindEvents() {

        $('body').on('shown.bs.modal', onModalOpen);
        $('body').on("click", "#eventUpdate", updateEvent);
    }


    function updateEvent() {
        var eventId = $(this).data("id");
        var event = {};
        event.id = $(this).data("id");
        event.boatId = $("#selectedBoat").val();
        event.boatName =  $("#selectedBoat option:selected").text();
        event.subject = $("#subject").val();
        event.description = $("#description").val();
        event.privateDescription = $("#privateDescription").val();
        event.startDate = $("#startDate").val();
        event.endDate = $("#endDate").val();
        event.personCount = $("#personCount").val();
        event.startLocation = $("#startLocation").val().split("-")[0].replace(/\s/g, '');
        event.endLocation = $("#startLocation").val().split("-")[1].replace(/\s/g, '');
        event.fee = $("#fee").val();
        event.sell = $("#sell").val();
        event.mealCharge = $("#mealCharge").val();
        event.earnestMoney = $("#earnestMoney").val();
        event.moneyType1 = $("#moneyType1").val();
        event.moneyType2 = $("#moneyType2").val();
        event.moneyType3 = $("#moneyType3").val();
        event.moneyType4 = $("#moneyType4").val();
        event.hasDinner = $("#hasDinner").val();
        event.hasConfirm = $("#hasConfirm").val();
        event.hasCocktail = $("#hasCocktail").val();
        event.hasBreakfast = $("#hasBreakfast").val();

        toastr.options = {
            "positionClass": "toast-top-center",
            "timeOut": "1000"
        };

        $.ajax({
            url: '/etkinlik/update',
            method: 'post',
            data: event,
            success: function(response) {                
                toastr.success("Event başarıyla güncellendi.", "BAŞARILI!");
                // shuldRefreshPage();
                reloadPage();
            },
            error: function() {
                toastr.error("Event güncellenirken server tarafında hata alındı.", "HATA!");
            },
            complete: function() {}

        });

        //console.log(event);
    }


    function onModalOpen() {
        getCurrentValues();
    }

    function reloadPage(){
        window.location.reload();
    }

    function shuldRefreshPage() {
        var newDatetime = $("#startDateTime").val();
        var newSubject = $("#subject").val();
        if (currentValues.startDate !== newDatetime || currentValues.subject !== newSubject) {
            window.location.reload();
        }
    }

    var currentValues = {};

    function getCurrentValues() {
        currentValues.startDate = $("#startDateTime").val();
        currentValues.subject = $("#subject").val();
    }

    return {
        init: init
    }
})();


