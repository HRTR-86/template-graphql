<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Top;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TopController extends Controller
{
    /**
     * @param Request $request
     * @return Response|RedirectResponse
     * @throws Exception
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        return Inertia::render('Top/TopIndex');
    }
}
