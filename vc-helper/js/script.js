// 合法性检查
$(".needs-validation").each((_, ele) => {
    const self = $(ele);
    self.on("submit", (e) => {
        if (!ele.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        self.addClass("was-validated");
    });
});

// ANCHOR 歌曲基础信息
// 将“投稿平台”输入框根据复选框选择情况设置是否禁用
for (const site of ["bilibili", "acfun", "niconico", "youtube", "other"]) {
    $(`#${site}-checkbox`).on("change", (e) => {
        $(`#${site}-id`).prop("disabled", !e.target.checked);
    });
}

// 自动填充数据根据选择是否禁用
$("#bilibili-checkbox").on("change", (e) => {
    $("#bilibili-datafill").prop("disabled", !e.target.checked);
});
// 使用Bilibili数据填充后的部分隐藏
$("#bilibili-datafill").on("change", () => $("#song-uploader-control, #song-update-control").toggleClass("d-none"));

// 手动填入播放数的输入栏
$("#view").on("change", (e) => {
    $("#view-input").prop("disabled", !e.target.checked);
});

// ANCHOR 条目基础信息
// 歌曲引言的显示与否
$("#song-cquote").on("change", (e) => {
    $("#song-cquote-input").prop("disabled", !e.target.checked);
});

// ANCHOR VOCALOID Songbox信息
// VOCALOID Songbox的简化设置
$("#parameter-full").on("change", () =>
    $("#songbox-bg-simplify, #songbox-bg-full, #songbox-style-simplify, #songbox-style-full").toggleClass("d-none"),
);

// ANCHOR VOCALOID Songbox introduction信息
// 将“模板颜色”输入框根据复选框选择情况设置是否禁用
for (const color of ["lbgcolor", "ltcolor", "rbdcolor"]) {
    $(`#${color}`).on("change", (e) => {
        $(`#${color}-input`).prop("disabled", !e.target.checked);
    });
}

// STAFF框
let staffNum = 1;
const staffTemplate = `<div class="row gx-3 align-items-center">
            <div class="col-auto">
                <input type="text" class="form-control mb-1 staff-pos" placeholder="职位">
            </div>
            <div class="col-auto">
                <input type="text" class="form-control mb-1 staff-name" placeholder="名称">
            </div>
            <div class="btn-group col-auto" role="group">
                <button type="button" class="btn btn-outline-primary staff-add">+</button>
                <button type="button" class="btn btn-outline-primary staff-remove">-</button>
            </div>
        </div>`;
// 使用$(document).on而非$(".staff-add").on，因为staff-add和staff-remove按钮有可能是动态生成的
$(document).on("click", ".staff-add", () => {
    $("#staff-intro").append(staffTemplate);
    staffNum++;
    $(".staff-remove").prop("disabled", false);
});
$(document).on("click", ".staff-remove", (e) => {
    $(e.target).closest(".row").remove();
    staffNum--;
    $(".staff-remove").prop("disabled", staffNum == 1);
});

// ANCHOR 歌词
// 歌词部分的状态转换
$("#lyrics-change").on("change", (e) => {
    $("#lyrics-trans").prop("required", e.target.checked).parent().toggleClass("d-none");
    $("#lyrics-parameter-switch").toggleClass("d-none");
    if (!e.target.checked) {
        $("#lyrics-parameter").prop("checked", false);
        $("#lyricskai-parameter").addClass("d-none");
    }
});
$("#lyrics-parameter").on("change", () => $("#lyricskai-parameter").toggleClass("d-none"));

// ANCHOR 大家族模板
let templateNum = 1;
const temTemplate = `<div class="row gx-3 mb-2 align-items-center">
            <div class="col-auto">
                <input type="text" class="form-control template-name" placeholder="模板名">
            </div>
            <div class="form-check form-switch col-auto">
                <input class="form-check-input template-collapse" type="checkbox" id="template-collapse-$count">
                <label class="form-check-label" for="template-collapse-$count">是否折叠</label>
            </div>
            <div class="btn-group col-auto" role="group">
                <button type="button" class="btn btn-outline-primary template-add">+</button>
                <button type="button" class="btn btn-outline-primary template-remove">-</button>
            </div>
        </div>`;
$(document).on("click", ".template-add", () => {
    $("#template-info").append(temTemplate.replaceAll("$count", templateNum));
    templateNum++;
    $(".template-remove").prop("disabled", false);
});
$(document).on("click", ".template-remove", (e) => {
    $(e.target).closest(".row").remove();
    templateNum--;
    $(".template-remove").prop("disabled", templateNum == 1);
});

// ANCHOR 分类
let categoryNum = 1;
const categoryTemplate = `<div class="row gx-3 mb-2 align-items-center">
            <div class="col-auto">
                <input type="text" class="form-control category-name" placeholder="分类名">
            </div>
            <div class="btn-group col-auto" role="group">
                <button type="button" class="btn btn-outline-primary category-add">+</button>
                <button type="button" class="btn btn-outline-primary category-remove" disabled>-</button>
            </div>
        </div>`;
$(document).on("click", ".category-add", () => {
    $("#category-info").append(categoryTemplate);
    categoryNum++;
    $(".category-remove").prop("disabled", false);
});
$(document).on("click", ".category-remove", (e) => {
    $(e.target).closest(".row").remove();
    categoryNum--;
    $(".category-remove").prop("disabled", categoryNum == 1);
});
