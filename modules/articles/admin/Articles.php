<?php
namespace Controllers;

use Models\Articles as Model;

class Articles extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $articles = new Model\Article();
        $all_articles = $articles->getAll();
        $this->smarty->assign('articles', $all_articles);
        $this->display('Articles/index.tpl');
    }
    
    public function edit($request){
        $articles = new Model\Article();
        $article = $articles->getByID($request['id']);
        $this->smarty->assign('article', $article);
        $this->smarty->assign('request', $request);
        $this->display('Articles/edit.tpl');
    }
    
    public function save($request){
        $article_model = new Model\Article();
        if ($request['id'])
            $article = $article_model->getByID($request['id']);
        else
            $article = $article_model;
        
        $article->setFields($request);
        
        $id = $article->save();
        
        if (!$request['id']) {
            $articles = new Model\Article();
            $article = $articles->getByID($id);
        }
        
        $this->smarty->assign('article', $article);
        $this->smarty->assign('request', $request);
        header('Location: ' . MAIN_DIR . ADMIN_DIR . '/articles/edit/?id='.$article->id);
    }
    
    public function delete($request) {
        $article_model = new Model\Article();
        if ($request['id']) {
            $article = $article_model->getByID($request['id']);
            $article->delete();
            header('Location: ' . MAIN_DIR . ADMIN_DIR . '/articles/');
        } else
            $this->smarty->assign('system_error', 'Please, provide ID!');
    }
    
    public function getEditArticle($request){
        $this->smarty->assign('template', 'sparrow/Articles/view.tpl');
        echo $this->smarty->fetch('sparrow/index.tpl');
    }

}