<?php
namespace Controllers;

use Models\Pages as Model;

class Pages extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $pages = new Model\Page();
        $all_pages = $pages->getAll('creation_date', 'DESC');
        $this->smarty->assign('pages', $all_pages);
        $this->display('Pages/index.tpl');
    }
    
    public function edit($request){
        
        $pages = new Model\Page();
        $page = $pages->getByID($request['id']);
        $this->smarty->assign('page', $page);
        $this->smarty->assign('request', $request);
        $this->display('Pages/edit.tpl');
    }
    
    public function save($request){
        $page_model = new Model\Page();
        if ($request['id'])
            $page = $page_model->getByID($request['id']);
        else
            $page = $page_model;
        
        $request['author'] = $_SESSION['user']->id;
        $page->setFields($request);
        
        $id = $page->save();
        
        if (!$request['id']) {
            $pages = new Model\Page();
            $page = $pages->getByID($id);
            var_dump($page);
        }
        
        $this->smarty->assign('page', $page);
        $this->smarty->assign('request', $request);
        header('Location: ' . MAIN_DIR . ADMIN_DIR . '/pages/edit/?id='.$page->id);
    }
    
    public function delete($request) {
        $page_model = new Model\Page();
        if ($request['id']) {
            $page = $page_model->getByID($request['id']);
            $page->delete();
            header('Location: ' . MAIN_DIR . ADMIN_DIR . '/pages/');
        } else
            $this->smarty->assign('system_error', 'Please, provide ID!');
    }
    
    public function getEditPage($request){
        $this->smarty->assign('template', 'sparrow/Pages/view.tpl');
        echo $this->smarty->fetch('sparrow/index.tpl');
    }

}