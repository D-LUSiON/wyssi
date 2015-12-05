<script type="text/javascript" src="js/pages-edit.js"></script>
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
        <button type="submit">Save</button>
    </form>
</div>