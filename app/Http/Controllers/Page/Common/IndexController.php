<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Common;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    /**
     * @return Application|Factory|View
     */
    public function __invoke(): Application|Factory|View
    {
        return view('Index', ['isAuthed' => Auth::check()]);
    }
}
