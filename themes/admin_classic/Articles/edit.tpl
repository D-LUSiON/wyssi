<link rel="stylesheet" type="text/css" href="{get_path asset='css/jquery.modalWindow.css'}" media="all"/>
{*<script type="text/javascript" src="{get_path asset="js/jquery.fileBrowser.js"}"></script>*}
<script type="text/javascript" src="{get_path asset="js/article-edit.js"}"></script>
<div class="edit-container">
    <div class="edit_header-container">
        <h1><span class="fa fa-desktop"></span> Articles</h1>
        <div id="breadcrumb">
            <a href="{get_path url="admin"}">
                <span class="fa fa-desktop"></span> Dashboard
            </a>
            <a href="{get_path url="admin/articles/"}">Articles</a>
            {if $article->id}<a href="{get_path url="admin/articles/edit?id={$article->id}"}"> (edit ID# {$article->id}) {$article->title}</a>{/if}
        </div>
    </div>
    <div class="edit_content-container">
        <form action="{get_path url="admin/articles/save"}" method="POST" enctype="multipart/form-data">
            <section>
                <aside>
                    <label>Creation date:</label>
                    <input type="text" name="creation_date"/>
                    <label>Publish date:</label>
                    <input type="text" name="publish_date"/>
                    <label>Main image:</label>
                    <div class="file_browser-trigger button">Choose...</div>
                    <label>Category:</label>
                    <select name="category">
                        <option value="" disabled selected>Choose...</option>
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                        <option value="3">Category 3</option>
                    </select>
                    <label>Author:</label>
                    <select name="author">
                        <option value="" disabled selected>Choose...</option>
                        <option value="1">Author 1</option>
                        <option value="2">Author 2</option>
                        <option value="3">Author 3</option>
                    </select>
                </aside>
                <main>
                    <div class="form-container">
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
                        <div class="buttons-container">
                            <button type="submit">Save</button>
                            <button type="reset">Reset</button>
                        </div>
                    </div>
                </main>
            </section>
        </form>
    </div>
</div>