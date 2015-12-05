<script type="text/javascript" src="js/pages-edit.js"></script>
<div id="edit-container">
    <form action="{$mainDir}admin/articles/save" method="POST">
        <input type="hidden" name="id" value="{$article->id}"/>
        <div>
            <label>Title</label>
        </div>
        <div>
            <input type="text" name="title" value="{$article->title}"/>
        </div>
        <div>
            <label>Description</label>
        </div>
        <div>
            <input type="text" name="description" value="{$article->description}"/>
        </div>
        <div>
            <label>Content</label>
        </div>
        <div>
            <textarea name="content">{$article->content}</textarea>
        </div>
        <button type="submit">Save</button>
    </form>
</div>