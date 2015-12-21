<script type="text/javascript" src="js/pages-edit.js"></script>
<div class="edit-container">
    <div class="edit_header-container">
        <h1><span class="fa fa-desktop"></span> Pages</h1>
        <div id="breadcrumb">
            <a href="{get_path url="admin"}">
                <span class="fa fa-desktop"></span> Dashboard
            </a>
            <a href="{get_path url="admin/edit"}">Pages</a>
            <a href="{get_path url="admin/edit?id={$page->id}"}"> (edit ID# {$page->id}) {$page->title}</a>
        </div>
    </div>
    <div class="edit_content-container">
        <div class="wrapper">
            <div id="edit-container">
                <form action="{$mainDir}admin/pages/save" method="POST">
                    <input type="hidden" name="id" value="{$page->id}"/>
                    <div>
                        <label>Title</label>
                    </div>
                    <div>
                        <input type="text" name="title" value="{$page->title}"/>
                    </div>
                    <div>
                        <label>Description</label>
                    </div>
                    <div>
                        <input type="text" name="description" value="{$page->description}"/>
                    </div>
                    <div>
                        <label>Content</label>
                    </div>
                    <div>
                        <textarea name="content">{$page->content}</textarea>
                    </div>
                    <div class="buttons-container">
                        <button type="submit">Save</button>
                        <button type="reset">Reset</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</div>