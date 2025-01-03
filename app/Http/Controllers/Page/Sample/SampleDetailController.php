<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Sample;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SampleDetailController extends Controller
{
    /**
     * @param Request $request
     * @return Response|RedirectResponse
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        return Inertia::render('Index');
    }
}
