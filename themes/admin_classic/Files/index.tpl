<script type="text/javascript" src="{get_path asset="js/jquery.fileBrowser.js"}"></script>
<script type="text/javascript" src="{get_path asset="js/files-list.js"}"></script>
<h1><span class="fa fa-desktop"></span> File browser</h1>
<div id="breadcrumb">
    <a href="{get_path url="admin"}">
        <span class="fa fa-desktop"></span> Dashboard
    </a>
    <a href="{get_path url="admin/edit"}">Uploaded files</a>
</div>
<div class="file_browser"></div>
{include file="admin_classic/Files/files_list.tpl"}
